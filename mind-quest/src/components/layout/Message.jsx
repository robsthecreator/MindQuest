import { FaInfoCircle } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoIosWarning } from "react-icons/io";
import { RiCloseFill } from "react-icons/ri";
import { SlClose } from "react-icons/sl";
import styles from "./Message.module.css";
import { useState } from "react";

function Message({ type, msg, onClose }) {
  const [visible, setVisible] = useState(true);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <FaRegCircleCheck className={styles.check_icon} />;
      case "info":
        return <FaInfoCircle className={styles.check_icon} />;
      case "warning":
        return <IoIosWarning className={styles.check_icon} />;
      case "error":
        return <SlClose className={styles.check_icon} />;
      default:
        return null;
    }
  };

  const handleClose = () => {
    setVisible(false);

    if (onClose) onClose();
  };

  return (
    <>
      {visible && (
        <div className={`${styles.message} ${styles[type]}`}>
          <div className={styles.sideWall}></div>
          {getIcon()}
          {msg}
          <RiCloseFill className={styles.closeButton} onClick={handleClose} />
        </div>
      )}
    </>
  );
}

export default Message;
