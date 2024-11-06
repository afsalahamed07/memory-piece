import "./app.css";
import Bottom from "./bottom/Bottom";
import Content from "./content/Content";
import Loading from "./Loading";
import Top from "./top-bar/Top";
import { useState, useEffect } from "react";
import { characters } from "./infra/characters-list-util";

function App() {
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [charactersState, setCharectersState] = useState([]);

  useEffect(() => {
    setLoading(true);

    characters().then((loadedCharacters) => {
      setCharectersState(loadedCharacters);
      setLoading(false);
    });
  }, []);

  return (
    <div className="app">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Top score={score} />
          <Content
            score={score}
            setScore={setScore}
            loading={loading}
            setLoading={setLoading}
            charactersState={charactersState}
            setCharectersState={setCharectersState}
          />
          <Bottom />
        </>
      )}
    </div>
  );
}

export default App;
