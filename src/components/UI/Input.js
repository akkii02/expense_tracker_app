const Input = (props) => {
  return (
    <>
      <label>{props.label}</label>
      <input
        type={props.type}
        placeholder={props.placeholder}
        className={props.className}
        onClick={props.onClick}
        value={props.value}
        onChange={props.onChange}
      />
    </>
  );
};
export default Input;
