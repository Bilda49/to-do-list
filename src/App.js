import React, { useState } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskValue, setEditedTaskValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleEditInputChange = (event) => {
    setEditedTaskValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      setTodoList([
        ...todoList,
        { id: Date.now(), task: inputValue, completed: false },
      ]);
      setInputValue("");
    }
  };

  const handleTaskDelete = (id) => {
    setTodoList(todoList.filter((task) => task.id !== id));
  };

  const handleTaskCompletion = (id) => {
    setTodoList(
      todoList.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  };
  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    setTodoList(
      todoList.map((task) => {
        if (task.id === editingTaskId) {
          return { ...task, task: editedTaskValue };
        }
        return task;
      })
    );
    setEditingTaskId(null);
    setEditedTaskValue("");
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {todoList.map((task) => (
          <li key={task.id}>
            {editingTaskId === task.id ? (
              <form onSubmit={handleEditFormSubmit}>
                <input
                  type="text"
                  value={editedTaskValue}
                  onChange={handleEditInputChange}
                />
                <button type="submit">Save</button>
              </form>
            ) : (
              <>
                <span className={task.completed ? "completed" : ""}>
                  {task.task}
                </span>
                <button onClick={() => handleTaskDelete(task.id)}>
                  Delete
                </button>
                <button onClick={() => handleTaskCompletion(task.id)}>
                  {task.completed ? "Incomplete" : "Complete"}
                </button>
                <button onClick={() => setEditingTaskId(task.id)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
