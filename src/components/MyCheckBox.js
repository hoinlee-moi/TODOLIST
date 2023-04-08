

const MyCheckBox = ({onChange, checked}) => {
  return (
    <input
      type="checkbox"
      onChange={onChange}
      checked={checked}
    />
  );
};

export default MyCheckBox;
