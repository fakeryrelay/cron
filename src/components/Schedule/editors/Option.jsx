export const Option = ({
  children,
  optionName,
  title,
  activeOption,
  handleOptionSelect,
}) => {
  const isChecked = (value) => value === activeOption;

  return (
    <div className="option">
      <div className="radio">
        <label>
          <input
            type="radio"
            name={optionName}
            onChange={handleOptionSelect}
            checked={isChecked(optionName)}
          />
          <div className={isChecked(optionName) ? 'checked' : ''}/>
          <span>{title}:</span>
        </label>
      </div>
      {children}
    </div>
  );
};
