import React from 'react';
import './App.scss';

import { TodoList } from './components/TodoList';
import TodoType from './types/TodoType';
import todos from './api/todos';
import users from './api/users';

type State = {
  allTodos: TodoType[];
  userName: string;
  todoItem: string;
  error: string;
};

export default class App extends React.Component<{}, State> {
  state:State = {
    allTodos: [...todos],
    userName: '',
    todoItem: '',
    error: '',
  };

  clearInputs = () => {
    this.setState({
      userName: '',
      todoItem: '',
      error: '',
    });
  };

  addError = () => {
    this.setState({
      error: 'Please enter a valid value',
    });
  };

  addTodo = () => {
    const { userName, todoItem } = this.state;

    if (
      users.some(user => userName === user.name) && todoItem
    ) {
      this.setState(prevState => {
        const currenTodoItem = prevState.todoItem;
        const currentUserId = prevState.allTodos[prevState.allTodos.length - 1].id + 1;
        const currentUserIndex = users.findIndex(user => prevState.userName === user.name);
        const newTodo = {
          userId: users[currentUserIndex].id,
          id: currentUserId,
          title: currenTodoItem,
        };

        return {
          allTodos: [...prevState.allTodos, newTodo],
        };
      });
      this.clearInputs();
    } else {
      this.addError();
    }
  };

  render() {
    const {
      allTodos,
      todoItem,
      userName,
      error,
    } = this.state;

    return (
      <div className="App">
        <h1 className="App__main-title">Todo list</h1>
        <form
          onSubmit={event => {
            event.preventDefault();
            this.addTodo();
          }}
        >
          <div>
            <select
              name="user"
              className="input App__user-selector"
              value={userName}
              onChange={(event) => this.setState({
                userName: event.currentTarget.value,
              })}
            >
              <option className="options-item">Choose name</option>
              {users.map(user => {
                return (
                  <option className="options-item">
                    {user.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="field-error">
            {!userName ? error : ''}
          </div>

          <div>
            <div>
              <input
                type="text"
                placeholder="Add todo..."
                className="input App__todo-input"
                value={todoItem}
                onChange={(event) => {
                  this.setState({
                    todoItem: event.currentTarget.value,
                  });
                }}
              />
            </div>

            <div className="field-error">
              {!todoItem ? error : ''}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className=" input App__add-todo"
            >
              Add
            </button>
          </div>
        </form>
        <p>
          <TodoList allTodos={allTodos} />
        </p>

      </div>
    );
  }
}