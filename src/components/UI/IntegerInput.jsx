export const IntegerInput = ({name, min, max, value, innerRef, onChange, disabled}) => {
  return (
    <input
    className="option__input"
    type="number"
    step={1}
    onKeyPress={(event) => {
      if (!/[0-9]/.test(event.key)) {
        event.preventDefault();
        return;
      }
      if (Number(event.target.value + event.key) > event.target.max) {
        event.preventDefault();
        return;
      }
      if (Number(event.target.value + event.key) < event.target.min) {
        event.preventDefault();
        return;
      }
    }}

    name={name}
    min={min}
    max={max}
    value={value}
    ref={innerRef}
    onChange={onChange}
    disabled={disabled}
  />
  )
}