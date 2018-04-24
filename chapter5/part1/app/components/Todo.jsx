import React from 'react';
import List from './List';
import CreateButton from './CreateButton';
import TodoStore from '../stores/TodoStore';
import TodoAction from '../actions/TodoAction';
import uuid from 'uuid';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: TodoStore.getAll()
    };
    this.createTodo = () => {
      // 创建 Todo 的事件回调
      TodoAction.create({ id: uuid.v4(), content: '3rd stuff' });
    };
    this.deleteTodo = id => {
      // 删除 Todo 的事件回调
      TodoAction.delete(id);
    };
    this.onChange = () => {
      this.setState({
        todos: TodoStore.getAll()
      });
    };
  }
  componentDidMount() {
    TodoStore.addChangeListener(this.onChange);
  }
  componentWillUnmount() {
    TodoStore.removeChangeListener(this.onChange);
  }
  render() {
    return (
      <div>
        <List items={this.state.todos} onDelete={this.deleteTodo} />
        <CreateButton onClick={this.createTodo} />
      </div>
    );
  }
}

export default Todo;
