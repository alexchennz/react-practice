import { useCallback, useEffect, useState } from "react";

const Child = ({ getItems }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getItems());
    console.log("Child Rendered");
  }, [getItems]);

  return items.map((item) => <p key={item}>{item}</p>);
};

const UseCallbackExample = () => {
  const [count, setCount] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const themeColor = {
    backgroundColor: darkMode ? "#333" : "#fff",
    color: darkMode ? "#fff" : "#333",
  };

  const getItems = useCallback(() => {
    return [count, count + 1, count + 2];
  }, [count]);

  return (
    <div style={themeColor}>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setDarkMode((prev) => !prev)}>
        Toggle Dark Mode
      </button>
      <Child getItems={getItems} />
    </div>
  );
};

export default UseCallbackExample;