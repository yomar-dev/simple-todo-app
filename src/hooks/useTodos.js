import React from 'react';

const initialState = {
  todos: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'loadTodos':
      return {
        todos: action.payload,
      };
    case 'completeTodo': {
      const newTodos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          todo.isComplete = true;
        }
        return todo;
      });
      return {
        ...state,
        todos: newTodos,
      };
    }
  }
}

export function useTodos() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  React.useEffect(() => {
    async function getTodos() {
      const response = await fetch('http://localhost:8000/todos');
      const data = await response.json();
      const newTodos = data.map((todo) => {
        return { ...todo, status: '' };
      });
      dispatch({
        type: 'loadTodos',
        payload: newTodos,
      });
    }

    getTodos();
  }, []);

  return { todos: state.todos, dispatch };
}
