import React, { useState } from "react";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo]);
      setNewTodo("");
    }
  };
  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingText(todos[index]);
  };

  const updateTodo = () => {
    if (editingText.trim()) {
      const updatedTodos = [...todos];
      updatedTodos[editingIndex] = editingText;
      setTodos(updatedTodos);
      setEditingIndex(null);
      setEditingText("");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow-md">
      <h1 className="text-xl font-bold mb-4">To-Do List</h1>
      <div className="mb-4">
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="Add a new task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 mt-2 w-full"
          onClick={addTodo}
        >
          Add Task
        </button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            className="flex justify-between items-center border-b p-2"
          >
            {editingIndex === index ? (
              <input
                type="text"
                className="border p-1"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <span>{todo}</span>
            )}
            <div>
              {editingIndex === index ? (
                <button
                  className="bg-green-500 text-white px-2 py-1 mx-1"
                  onClick={updateTodo}
                >
                  Save
                </button>
              ) : (
                <button
                  className="bg-yellow-500 text-white px-2 py-1 mx-1"
                  onClick={() => startEditing(index)}
                >
                  Edit
                </button>
              )}
              <button
                className="bg-red-500 text-white px-2 py-1"
                onClick={() => deleteTodo(index)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
