import "./skillGroup.css";
import Skill from "./Skill";
import { useState } from "react";

const SkillGroup = ({ title, skills, onSelectionToggle }) => {
  return (
    <div className="container__skills">
      <p className="skills__title">{title}</p>
      <div className="skills__list">
        {skills.map((skill) => (
          <Skill
            key={skill.name}
            name={skill.name}
            image={`/images/techs/${skill.src}`}
            onSelectionToggle={onSelectionToggle}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillGroup;
