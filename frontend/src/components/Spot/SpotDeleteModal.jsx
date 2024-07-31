import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteExistingSpot } from "../../store/spotcrud";
import { useModal } from "../../context/Modal";

const DeleteSpotModal = ({spotId}) => {
    const dispatch = useDispatch();
    const {closeModal} = useModal();
    const [message, setMessage] = useState("");

    const handleDelete = async () => {
        const result = await dispatch(deleteExistingSpot(spotId));
        if (result){
            setMessage("Spot Successfully Deleted.");
            setTimeout(() => {
                closeModal();
            }, 2000);
        }
    };

    return (
        <div>
            {!message? (
                <>
                    <h2>Confirm Delete</h2>
                    <p>Are you sure you want to remove this spot from the listings</p>
                    <button onClick={handleDelete}>Yes (Delete Spot)</button>
                    <button onClick={closeModal}>No (Keep Spot)</button>
                </>
            ):(
                <h2>{message}</h2>
            )}
        </div>
    );
}

export default DeleteSpotModal;