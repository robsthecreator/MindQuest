import styles from "./SubmitButton.module.css";

function SubmitButton({ text }) {
  return (
    <div>
      <button className={styles.submit_button} name="" id="">
        {text}
      </button>
    </div>
  );
}

export default SubmitButton;
