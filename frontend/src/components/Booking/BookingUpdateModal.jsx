import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { getUserBookings, updateExistingBooking } from "../../store/booking";
import "./BookingModal.css"


function BookingUpdateModal({bookingId}) {
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [errors, setErrors] = useState({});
    const [bookedDates, setBookedDates] = useState([]);
    const { closeModal } = useModal();

    const bookings = useSelector(state => state.booking.userBookings);
    
    useEffect(() => {
        //Fetch booked dates and update state
        if (!bookings){
            dispatch(getUserBookings());
        }
    },[dispatch, bookings]);

    useEffect(() => {
        if (bookings && bookingId){
            const booking = bookings[bookingId];

            if (booking){
                // Set the initial start and end dates based on the booking data
                const start = new Date(booking.startDate);
                const end = new Date(booking.endDate);

                setStartDate(new Date(start.setDate(start.getDate() + 1)));
                setEndDate(new Date(end.setDate(end.getDate() + 1)));
            }
        }
    },[ bookings, bookingId])
    
    useEffect(() => {
        if (bookings){
            //Update bookedDates when bookings change
            const bookingsCopy = {...bookings};
            delete bookingsCopy[bookingId];
            const bookingsArray = Object.values(bookingsCopy);
          

            const dates = bookingsArray.flatMap(booking => {
                const start = new Date(booking.startDate);
                const end = new Date(booking.endDate);

                const rangeDates = [];

                let currentDate = new Date(start);

                // Adjust for timezones by setting the time to midnight
                currentDate.setHours(0,0,0,0);

                // Shift dates by 1 day
                start.setDate(start.getDate() + 1);
                end.setDate(end.getDate() + 1);


                while (currentDate <= end){
                    rangeDates.push({
                        date: new Date(currentDate)
                    });
                    
                    currentDate.setDate(currentDate.getDate() + 1);
                }

                return rangeDates;

            });

            setBookedDates(dates);
        }
    },[dispatch, bookingId, bookings, startDate, endDate]);

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const extractDate = (date) => {
        const dateObject = new Date(date);
        dateObject.setHours(0,0,0,0); // Ensure the date is set to midnight

        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, "0"); //getMonth() is zero-based
        const day = String(dateObject.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }
   
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});        

        if (startDate && endDate){
            const bookingDates = {
                startDate: extractDate(startDate),
                endDate: extractDate(endDate)
            };
            dispatch(updateExistingBooking(bookingId, bookingDates));
            closeModal();
        } else {
            setErrors({date:"Please select both start and end dates."})
        }
    };

    // // Function to check if a date is within any booked range
    // const isBooked = (date) => {
    //     const dateObject = new Date(date);
    //     return bookedDates.some(({start, end}) => {
    //         const startDate = new Date(start);
    //         const endDate = new Date(end);

    //         return dateObject >= startDate && dateObject <= endDate;
    //     });
    // };

    // Create an array of booked dates for highlighting
    const highlightDates = [
        {
            "react-datepicker__day--highlighted-booked": bookedDates.map(({date}) => new Date(date))
        }
    ];

    const isBooked = (date) => {
        const dateObject = new Date(date);
        return bookedDates.some(({date}) => {
            const bookedDate = new Date(date);
            return dateObject.toDateString() === bookedDate.toDateString();
        });
    };

    return (
        <>
            <h1>Book Your Stay</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Select Dates
                    <div className="datepicker-container">
                        <DatePicker 
                            selected={startDate}
                            onChange={handleDateChange}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            shouldCloseOnSelect={false} //Keep calendar open until both dates are selected
                            popperPlacement="top-start"
                            minDate={new Date()} //Prevent past dates from being selected
                            highlightDates={highlightDates}
                            filterDate={date => !isBooked(date)} //Disable clicking on booked dates
            
                        />
                    </div>
                </label>
                {errors.date && <p>{errors.date}</p>}
                <button 
                    type="submit"
                    className="enabled-button"
                >
                   Update Booking
                </button>
            </form>
        </>
    );
}

export default BookingUpdateModal;