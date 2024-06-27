import styles from "./Input.module.css";

function Input({ type, text, name, placeholder, handleOnChange, value }) {
  return (
    <div>
      <label htmlFor={name}>{text}:</label>
      <input
        maxLength={46}
        className={styles.form_input}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        autoComplete="off"
      />
    </div>
  );
}

export default Input;
