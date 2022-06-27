import { useContext, useEffect, useRef, useState } from "react";
import { UIContext } from "../App";
import AnimatedButton from "../components/AnimatedButton";
import DialogBubble from "../components/DialogBubble";
import SkillGroup from "../components/SkillGroup";
import Typewritter from "../components/Typewritter";
import { checkWithDelay } from "../helpers/scrollCheck";
import useWindowDimensions from "../helpers/useWindowDimensions";
import AnimatedCanvas from "./AnimatedCanvas";
import "./introduction.css";

const ROLES = ["Web Developer", "Computer Engineer"];

const LEARNT = [
  {
    name: "HTML5",
    alt: "HTML5 logo",
    src: "/html5.svg",
    description:
      "HyperText Markup Language (HTML) is the basic scripting language used by web browsers to render pages on the world wide web. HyperText allows a user to click a link and be redirected to a new page referenced by that link.",
  },
  {
    name: "CSS3",
    alt: "CSS3 logo",
    src: "/css3.svg",
    description:
      "Cascading Style Sheets (CSS) is a stylesheet language used to describe the presentation of a document written in HTML or XML (including XML dialects such as SVG, MathML or XHTML). CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.",
  },
  {
    name: "JavaScript",
    alt: "JavaScript logo",
    src: "/javascript.svg",
    description:
      "JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. JavaScript is a prototype-based, multi-paradigm, single-threaded, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.",
  },
  {
    name: "TypeScript",
    alt: "TypeScript logo",
    src: "/typescript.svg",
    description:
      "TypeScript is a superset of typed JavaScript (optional) that can help build and manage large-scale JavaScript projects. It can be considered JavaScript with additional features like strong static typing, compilation, and object-oriented programming.",
  },
  {
    name: "React",
    alt: "React logo",
    src: "/react.svg",
    description:
      "React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called 'components'.",
  },
  {
    name: "Vue",
    alt: "Vue logo",
    src: "/vuedotjs.svg",
    description:
      "Vue is a JavaScript framework for building user interfaces. It builds on top of standard HTML, CSS and JavaScript, and provides a declarative and component-based programming model that helps you efficiently develop user interfaces, be it simple or complex.",
  },
  {
    name: "Express",
    alt: "Express logo",
    src: "/express.svg",
    description:
      "Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.",
  },
  {
    name: "GitHub",
    alt: "GitHub logo",
    src: "/github.svg",
    description:
      "GitHub is a provider of Internet hosting for software development and version control using Git. It offers the distributed version control and source code management (SCM) functionality of Git, plus its own features. It provides access control and several collaboration features such as bug tracking, feature requests, task management, continuous integration, and wikis for every project",
  },
  {
    name: "Figma",
    alt: "Figma logo",
    src: "/figma.svg",
    description:
      "Figma is a vector graphics editor and prototyping tool which is primarily web-based, with additional offline features enabled by desktop applications for macOS and Windows. The feature set of Figma focuses on use in user interface and user experience design, with an emphasis on real-time collaboration.",
  },
  {
    name: "Docker",
    alt: "Docker logo",
    src: "/docker.svg",
    description:
      "Docker is an open platform for developing, shipping, and running applications. Docker enables you to separate your applications from your infrastructure so you can deliver software quickly. By taking advantage of Docker’s methodologies for shipping, testing, and deploying code quickly, you can significantly reduce the delay between writing code and running it in production.",
  },
];

const LEARNING = [
  {
    name: "Go",
    alt: "Go logo",
    src: "/go.svg",
    description:
      "The Go programming language is a fast, statically typed, compiled language that feels like a dynamically typed, interpreted language.",
  },
  {
    name: "Swift",
    alt: "Swift logo",
    src: "/swift.svg",
    description:
      "Swift is a robust and intuitive programming language created by Apple for building apps for iOS, Mac, Apple TV, and Apple Watch. It’s designed to give developers more freedom than ever. Swift is easy to use and open source, so anyone with an idea can create something incredible.",
  },
  {
    name: "Blender",
    alt: "Blender logo",
    src: "/blender.svg",
    description:
      "Blender is a free and open-source 3D computer graphics software toolset used for creating animated films, visual effects, art, 3D-printed models, motion graphics, interactive 3D applications, virtual reality, and, formerly, video games.",
  },
];

const Introduction = () => {
  const scrollableXRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const { width, height } = useWindowDimensions();
  const [activeSkillRef, setActiveSkillRef] = useState(null);

  const [currentDescription, setCurrentDescription] = useState(null);
  const handleSelectionToggle = (ref) => {
    if (activeSkillRef) {
      activeSkillRef.current.classList.toggle("active");
    }
    setActiveSkillRef(ref);
    ref.current.classList.toggle("active");
    const techName = ref.current.innerText;
    const tech =
      LEARNING.find((tech) => tech.name === techName) ||
      LEARNT.find((tech) => tech.name === techName);
    setCurrentDescription(tech.description);
  };

  const handleScroll = async () => {
    setIsAnimating(true);
    const characterSpawnTime = 1000; //ms
    //Character spawning in
    await new Promise((r) => setTimeout(r, characterSpawnTime));
    while (
      scrollableXRef.current.scrollWidth * 0.5 >
      scrollableXRef.current.scrollLeft
    ) {
      scrollableXRef.current.scrollLeft += 2;
      //scrollableXRef.current.scrollWidth * 0.5 * 0.25;
      await new Promise((r) => setTimeout(r, 0));
    }
  };

  const { updateSection } = useContext(UIContext);

  useEffect(() => {
    scrollableXRef.current.addEventListener("scroll", (event) =>
      checkWithDelay(event, "horizontal", 100, updateSection)
    );

    return () => {
      scrollableXRef.current.removeEventListener("scroll", (event) =>
        checkWithDelay(event, "horizontal", 100, updateSection)
      );
    };
  }, []);

  const { settings } = useContext(UIContext);
  return (
    <div
      ref={scrollableXRef}
      className={`introduction snap-x-container ${settings.theme}-theme`}
      id="about"
    >
      <div className="about">
        {width <= 767 && (
          <img className="avatar-miniature" src="/images/avatar/about.png" />
        )}
        <div className="information">
          {width > 767 && (
            <img className="avatar-image" src="/images/avatar/about.png" />
          )}

          <div className="information__container">
            <div className="information__text">
              <p>Hi!</p>
              <p>I'm Sebastian</p>
              <Typewritter roles={ROLES} />
              <p>From Santiago{width > 767 && <span>, Chile</span>}</p>
              {width <= 767 && <p className="information__flag">Chile</p>}
            </div>
            <AnimatedButton onEvent={handleScroll} btnText={"Go"}>
              See skills
            </AnimatedButton>
          </div>
        </div>
        <AnimatedCanvas
          animationTrigger={isAnimating}
          onAnimationEnd={() => setIsAnimating(false)}
        />
      </div>
      <div className="skills">
        <div className="information">
          {/* Add context to fix prop drilling and to set information in speech bubble component */}
          <SkillGroup
            title={"SKILLS"}
            skills={LEARNT}
            onSelectionToggle={handleSelectionToggle}
          />
          <div className="dialog-container">
            <img className="avatar-image" src="/images/avatar/skills.png" />
            {currentDescription && (
              <DialogBubble description={currentDescription} />
            )}
          </div>
          <SkillGroup
            title={"LEARNING"}
            skills={LEARNING}
            onSelectionToggle={handleSelectionToggle}
          />
        </div>
      </div>
    </div>
  );
};

export default Introduction;
