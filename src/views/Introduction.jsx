import { useEffect, useRef, useState } from "react";
import AnimatedButton from "../components/AnimatedButton";
import Typewritter from "../components/Typewritter";
import AnimatedCanvas from "./AnimatedCanvas";
import "./introduction.css";

const ROLES = ["Web Developer", "Computer Engineer"];

const Introduction = () => {
  const scrollableXRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

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
  return (
    <div ref={scrollableXRef} className="introduction" id="about">
      <div className="about">
        <div className="information">
          <div className="information__avatar">
            <img src="/images/about.png" />
          </div>
          <div className="information__container">
            <div className="information__text">
              <p>Hi!</p>
              <p>I'm Sebastian</p>
              <Typewritter roles={ROLES} />
              <p>From Santiago, Chile</p>
            </div>
            <AnimatedButton onEvent={handleScroll}>See skills</AnimatedButton>
          </div>
        </div>
        <AnimatedCanvas
          animationTrigger={isAnimating}
          onAnimationEnd={() => setIsAnimating(false)}
        />
      </div>
      <div className="skills">
        <img src="/images/skills.png" />
      </div>
    </div>
  );
};

export default Introduction;
