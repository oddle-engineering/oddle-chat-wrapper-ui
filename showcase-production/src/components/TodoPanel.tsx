import React from 'react';

interface Todo {
  id: string;
  task: string;
  status: string;
  created_at: string;
}

interface TodoPanelProps {
  todos: Todo[];
  onAddTodo: (task: string) => void;
  onDeleteTodo: (id: string) => void;
}

export const TodoPanel: React.FC<TodoPanelProps> = ({ todos, onAddTodo, onDeleteTodo }) => {
  const [newTask, setNewTask] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      onAddTodo(newTask.trim());
      setNewTask('');
    }
  };

  return (
    <div className="panel">
      <h3>Todo List ({todos.length})</h3>
      
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new todo..."
          className="todo-input"
        />
        <button type="submit" className="add-btn">Add</button>
      </form>

      <div className="todo-list">
        {todos.length === 0 ? (
          <div className="empty-state">No todos yet. Add one above!</div>
        ) : (
          todos.map((todo) => (
            <div key={todo.id} className="todo-item">
              <div className="todo-content">
                <span className="todo-task">{todo.task}</span>
                <span className={`todo-status status-${todo.status}`}>
                  {todo.status}
                </span>
              </div>
              <div className="todo-actions">
                <span className="todo-date">
                  {new Date(todo.created_at).toLocaleDateString()}
                </span>
                <button
                  onClick={() => onDeleteTodo(todo.id)}
                  className="delete-btn"
                  title="Delete todo"
                >
                  ×
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};