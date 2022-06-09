import { useRef } from "react";
import "./skill.css";

const Skill = ({ name, image, onSelectionToggle }) => {
  const skillRef = useRef(null);

  return (
    <div ref={skillRef} className="skill">
      <object className="skill__image" data={image} alt="" />
      <p className="skill__name" onClick={() => onSelectionToggle(skillRef)}>
        {name}
      </p>
    </div>
  );
};

export default Skill;
