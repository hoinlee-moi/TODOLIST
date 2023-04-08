import MyCheckBox from "./MyCheckBox";

const TodoItem = ({ item }) => {
  return (
    <li key={item.id}>
      <label>
        <MyCheckBox checked={item.isCompleted ? true : false} />
        <span>{item.todo}</span>
      </label>
    </li>
  );
};

export default TodoItem;
