import "./app.css";
import Bottom from "./bottom/Bottom";
import Content from "./content/Content";
import Top from "./top-bar/Top";
import { useState } from "react";

function App() {
  const [score, setScore] = useState(0);
  return (
    <div className="app">
      <Top score={score} />
      <Content score={score} setScore={setScore} />
      <Bottom />
    </div>
  );
}

export default App;
