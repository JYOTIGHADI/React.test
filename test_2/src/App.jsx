
import React, { useState, useEffect } from "react";
import "./App.css"; 

// ---------------- Q6: Countdown Timer ----------------
function CountdownTimer() {
  const [count, setCount] = useState(10);

  useEffect(() => {
    if (count === 0) return;
    const timer = setInterval(() => {
      setCount(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [count]);

  return (
    <div className="card">
      <h2>Q6: Countdown Timer</h2>
      <p className="count">{count}</p>
    </div>
  );
}

// ---------------- Q7: Reversed Text ----------------
function ReversedText() {
  const [text, setText] = useState("");

  return (
    <div className="card">
      <h2>Q7: Reversed Text</h2>
      <input
        className="input"
        type="text"
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />
      <p className="result">Reversed: {text.split("").reverse().join("")}</p>
    </div>
  );
}

// ---------------- Q8: Todo List ----------------
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  const addTodo = () => {
    if (task.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: task, completed: false }]);
    setTask("");
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="card">
      <h2>Q8: Todo List</h2>
      <div className="todo-input">
        <input
          className="input"
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter todo..."
        />
        <button className="btn" onClick={addTodo}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.map(todo => (
          <li
            key={todo.id}
            onClick={() => toggleComplete(todo.id)}
            className={todo.completed ? "completed" : ""}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------- Q9: Product List ----------------
const products = [
  { id: 1, name: "Laptop", price: 60000 },
  { id: 2, name: "Phone", price: 30000 },
  { id: 3, name: "Headphones", price: 2000 },
];

function ProductList() {
  const [items, setItems] = useState(products);

  const sortByPrice = () => {
    const sorted = [...items].sort((a, b) => a.price - b.price);
    setItems(sorted);
  };

  return (
    <div className="card">
      <h2>Q9: Product List</h2>
      <button className="btn" onClick={sortByPrice}>Sort by Price</button>
      <ul className="product-list">
        {items.map(product => (
          <li key={product.id}>
            <span>{product.name}</span>
            <span className="price">₹{product.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------- Q10: useWindowWidth Hook ----------------
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

function WindowWidthComponent() {
  const width = useWindowWidth();
  return (
    <div className="card">
      <h2>Q10: Window Width Hook</h2>
      <p>Window width: <strong>{width}px</strong></p>
    </div>
  );
}

// ---------------- Main App ----------------
function App() {
  return (
    <div className="container">
      <h1>  Coding Solutions</h1>
      <CountdownTimer />
      <ReversedText />
      <TodoList />
      <ProductList />
      <WindowWidthComponent />
    </div>
  );
}

export default App;
