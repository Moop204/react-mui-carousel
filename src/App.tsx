import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Carousel } from "./Carousel";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <Carousel
          height={200}
          width={700}
          borderRadius="20px"
          bgcolor="white"
          padding="8px"
        />
      </header>
    </div>
  );
}

export default App;
