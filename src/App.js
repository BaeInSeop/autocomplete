import logo from "./logo.svg";
import "./App.css";
import "minireset.css";
import { useRef, useState } from "react";
import AutoComplete from "./components/autocomplete/AutoComplete";

function App() {
  const [tags, setTags] = useState([]);
  const [suggestions, setSuggestions] = useState([
    { id: 6, name: "Apricots", priority: 1 },
    { id: 1, name: "Apples", priority: 1 },
    { id: 2, name: "Pears", priority: 3 },
    { id: 3, name: "Bananas", priority: 3 },
    { id: 4, name: "Bananas", priority: 3 },
    { id: 4, name: "Mangos", priority: 2 },
    { id: 5, name: "Lemons", priority: 2 },
  ]);

  return (
    <div className="App">
      <div style={{ width: "500px", height: "80px" }}>
        <AutoComplete
          tags={tags}
          onChange={setTags}
          suggestions={suggestions}
          allowBackSpace={true}
          allowDuplicate={false}
          allowAddTag={true}
          useSort={false}
          useAvatar={true}
          width={"100%"}
          height={"100%"}
          tagDirection={"row"}
          placeholder="여기에 텍스트를 써주세요"
        />
      </div>
    </div>
  );
}

export default App;
