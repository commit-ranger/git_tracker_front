import { useState } from "react";
import "./App.css";
import Test_page from "./test";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Git Tracker</h1>
      <Test_page />
    </>
  );
}

export default App;
