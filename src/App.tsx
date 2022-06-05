import "./App.css";
import Contact from "./views/Contact";
import Header from "./views/Header";
import Introduction from "./views/Introduction";
import Projects from "./views/Projects";

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Introduction />
        <Projects />
        <Contact />
      </div>
    </>
  );
}

export default App;
