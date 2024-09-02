'use client'
import styles from './modal.module.css'
import ReactDOM from "react-dom";
const Modal = ({children}) => {
   
    const modalContent = (
        <div className={styles.modalOverlay}>
            {/* Wrap the whole Modal inside the newly created StyledModalWrapper
            and use the ref */}
            <div className={styles.modalWrapper}>
                <div className={styles.modal}>
                    
                    <div className={styles.modalBody}>{children}</div>
                </div>
            </div>
        </div>
    );
    return ReactDOM.createPortal(
        modalContent,
        document.getElementById("modal-root")
    );
}

export default Modal;