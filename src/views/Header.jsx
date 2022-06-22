import { useContext } from "react";
import { UIContext } from "../App";
import "./header.css";

const SECTIONS = [
  { id: "about", href: "#about", text: "About" },
  { id: "projects", href: "#projects", text: "Projects" },
  {
    id: "contact",
    href: "#contact",
    text: "Contact",
  },
];

const Map = ({ currentSection }) => {
  const getActive = (section) => (section === currentSection ? "active" : "");

  return (
    <div className="map">
      <div className="map__horizontal">
        <div className="map__vertical">
          <div className={`map__area ${getActive("about")}`}></div>
          <div className={`map__area ${getActive("skills")}`}></div>
        </div>
        <div className={`map__area ${getActive("projects")}`}></div>
        <div className={`map__area ${getActive("contact")}`}></div>
      </div>
    </div>
  );
};

const Header = () => {
  const { settings, updateSection, toggleTheme } = useContext(UIContext);
  const handleSectionSelection = (event) => {
    if (event.target.tagName !== "A") {
      return;
    } else {
      updateSection(event.target.hash.slice(1));
    }
  };

  const renderSectionsOptions = (currentSection) => {
    return SECTIONS.map((section) => {
      currentSection = currentSection === "skills" ? "about" : currentSection;
      return (
        <ul
          key={section.id}
          className={currentSection === section.id ? "active" : ""}
        >
          <a href={section.href}>{section.text}</a>
        </ul>
      );
    });
  };

  return (
    <>
      <div className="navbar">
        <h1 className="logo">SC</h1>
        <li className="sections" onClick={handleSectionSelection}>
          {renderSectionsOptions(settings.currentSection)}
        </li>
      </div>
      <Map currentSection={settings.currentSection} />
    </>
  );
};

export default Header;
