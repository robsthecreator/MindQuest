import styles from "./Select.module.css";

function Select({ text, name, options, handleOnChange, value }) {
  return (
    <div>
      <label htmlFor={name}>{text}:</label>
      <select className={styles.select_box} name={name} id={name} onChange={handleOnChange} value={value || ''}>
        <option value="">Selecione uma opção</option>
        {options.map((option) => (
          <option key={option.category_id} value={option.category_id}>{option.category_name}</option>
        ))}
      </select>
    </div>
  );
}

export default Select;
