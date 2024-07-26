export function completeTodo(id) {
  fetch(`http://localhost:8000/todos/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      isComplete: true,
    }),
  })
    .then((resp) => resp.json())
    .then((todo) => {
      console.log('Todo completed: ', todo.id);
    });
}
