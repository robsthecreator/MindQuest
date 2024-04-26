import styles from "./Select.module.css";

function Select({ text, name, options, handleOnChange, value }) {
  return (
    <div>
      <label htmlFor={name}>{text}:</label>
      <select className={styles.select_box} name="" id="">
        <option value="">Selecione uma opção</option>
      </select>
    </div>
  );
}

export default Select;
