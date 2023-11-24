import "./App.css";
import Main from './components/main.js'
import * as React from "react";

import useConfig from "./components/useConfig";

export default function App() {
  const config = useConfig();
  if (typeof window !== "undefined") {
    return (
      <div className="App">
        <header className="App-header">
        <Main/>
          
        </header>
        <body>
        </body>
      </div>
    );
  } else {
    return (
      <div className="App">
        <header className="App-header">
        </header>
      </div>
    );
  }
}
