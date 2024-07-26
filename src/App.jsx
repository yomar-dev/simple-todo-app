import React from 'react';

import { useTodos } from './hooks/useTodos';
import TodoItem from './components/TodoItem';

import { completeTodo } from './utils/completeTodo';

import './App.css';

function App() {
  const { todos, dispatch } = useTodos();
  const [sortedTodos, setSortedTodos] = React.useState([]);

  function onCompleteTodo(id) {
    completeTodo(id);
    dispatch({ type: 'completeTodo', payload: id });
  }

  React.useEffect(() => {
    const overdueItems = [];
    const soonestItems = [];
    const completedItems = [];

    const today = new Date().getTime();
    for (const todo of todos) {
      const { isComplete, dueDate } = todo;
      const todoDueDate = new Date(dueDate).getTime();
      if (isComplete) {
        todo.status = 'completed';
        completedItems.push(todo);
      } else {
        if (dueDate) {
          if (todoDueDate < today) {
            todo.status = 'overdue';
            overdueItems.push(todo);
          } else {
            todo.status = 'ontime';
            soonestItems.push(todo);
          }
        } else {
          todo.status = 'ontime';
          soonestItems.push(todo);
        }
      }
    }
    setSortedTodos([...overdueItems, ...soonestItems, ...completedItems]);
  }, [todos]);

  return (
    <section>
      <h1>Todo App</h1>
      <ul>
        {sortedTodos.map((todo) => (
          <TodoItem key={todo.id} item={todo} onCompleteTodo={onCompleteTodo} />
        ))}
      </ul>
    </section>
  );
}

export default App;
