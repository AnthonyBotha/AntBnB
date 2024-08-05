import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteExistingReview } from "../../store/userreviewcrud";
import { getUserReviews } from "../../store/userreviewcrud";
import { useModal } from "../../context/Modal";

const DeleteReviewModal = ({reviewId}) => {
    const dispatch = useDispatch();
    const {closeModal} = useModal();
    const [message, setMessage] = useState("");

    const handleDelete = async () => {
        const result = await dispatch(deleteExistingReview(reviewId));

        if (result){
            setMessage("Review Successfully Deleted.");

            await dispatch(getUserReviews());
            
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
                    <p>Are you sure you want to delete this review?</p>
                    <div className="button-container">
                        <button className="modal-yes-button" onClick={handleDelete}>Yes (Delete Reviews)</button>
                        <button className="modal-no-button" onClick={closeModal}>No (Keep Review)</button>
                    </div>
                </>
            ):(
                <h2>{message}</h2>
            )}
        </div>
    );
}

export default DeleteReviewModal;