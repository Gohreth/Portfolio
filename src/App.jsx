import {
  createContext,
  useContext,
  useEffect,
  useInsertionEffect,
  useRef,
  useState,
} from "react";
import "./App.css";
import AvatarSprite from "./components/avatarSprite";
import { checkWithDelay } from "./helpers/scrollCheck";
import Contact from "./views/Contact";
import Header from "./views/Header";
import Introduction from "./views/Introduction";
import Projects from "./views/Projects";
import ScrollContainer from "./views/ScrollContainer";

const INITIAL_UI = {
  theme: "dark",
  animation: false,
  currentSection: "about",
};

export const UIContext = createContext(null);

const UI = ({ children }) => {
  const [settings, setSettings] = useState(INITIAL_UI);
  const [currentRefs, setCurrentRefs] = useState([]);
  const toggleTheme = () => {
    settings.theme === "dark"
      ? setSettings({ ...settings, theme: "light" })
      : setSettings({ ...settings, theme: "dark" });
  };
  const toggleAnimation = () => {
    setSettings({ ...settings, animation: !settings.animation });
  };

  const updateSection = (sectionName) => {
    setSettings({ ...settings, currentSection: sectionName });
  };

  const addRef = (ref) => {
    setCurrentRefs([...currentRefs, ref]);
  };

  const removeRef = (id) => {
    const currentRefsCopy = [...currentRefs];
    currentRefsCopy.filter((ref) => ref.id !== id);
  };

  return (
    <UIContext.Provider
      value={{
        settings,
        toggleTheme,
        toggleAnimation,
        updateSection,
        currentRefs,
        addRef,
        removeRef,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

function App() {
  return (
    <UI>
      <Header />
      <ScrollContainer>
        <Introduction />
        <Projects />
        <Contact />
      </ScrollContainer>
    </UI>
  );
}

export default App;
