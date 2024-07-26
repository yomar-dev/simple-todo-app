export default function TodoItem({ item, onCompleteTodo }) {
  const { id, description, isComplete, dueDate, status } = item;

  const newDate = new Date(dueDate);
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();

  const fullDate = dueDate ? `${month}/${day}/${year}` : '';

  function onChange() {
    onCompleteTodo(id);
  }

  return (
    <li className={status}>
      <label htmlFor={id}>
        <input
          type="checkbox"
          name="id"
          id={id}
          onChange={onChange}
          checked={isComplete}
          disabled={isComplete}
        />
        <p className={status}>{description}</p>
      </label>
      <span>{fullDate}</span>
    </li>
  );
}
