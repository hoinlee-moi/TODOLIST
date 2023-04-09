

const MyCheckBox = ({onChange, checked,className}) => {
  return (
    <input
      type="checkbox"
      onChange={onChange}
      checked={checked}
      className={className}
    />
  );
};

export default MyCheckBox;
