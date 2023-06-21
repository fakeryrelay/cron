export const selectTheme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: "#fff",
  },
})

export const selectStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderColor: state.isFocused ? "#fff" : "#52525b",
    borderWidth: 2,
    minWidth: 250,
    maxWidth: 300,
    backgroundColor: "#000",
    color: "#fff",
    borderRadius: 10,
    opacity: state.isDisabled ? 0.5 : 1,
  }),
  option: (styles, state) => ({
    ...styles,
    color: "#fff",
    backgroundColor: state.isFocused ? "#313133" : "#52525b",
    border: "none",
  }),
  input: (styles) => ({
    ...styles,
    color: "#fff",
  }),
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: "#52525b",
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    color: "#fff",
  }),
  menuList: (styles) => ({
    ...styles,
    backgroundColor: "#000",
  }),
}