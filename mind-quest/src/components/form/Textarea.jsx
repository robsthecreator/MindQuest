import styles from "./Textarea.module.css";

function Textarea({
  type,
  text,
  name,
  placeholder,
  handleOnChange,
  value,
  maxLength,
}) {
  return (
    <div>
      <label htmlFor={name}>{text}:</label>
      <textarea
        className={styles.form_desc}
        type={type}
        name={name}
        maxLength={maxLength}
        id={name}
        placeholder={placeholder}
        autoComplete="off"
        onChange={handleOnChange}
        value={value}
      />
    </div>
  );
}

export default Textarea;
