import { useEffect, useRef } from "react";
import "./projects.css";

const Projects = () => {
  const leftCardFlipRef = useRef(null);
  const rightCardFlipRef = useRef(null);

  useEffect(() => {
    console.log(flipRef);
  }, []);
  return (
    <div className="projects" id="projects">
      <div className="information container3d">
        <div
          ref={leftCardFlipRef}
          className="flippable-card"
          style={{ backgroundColor: "red" }}
        >
          <div className="card__frontface"></div>
          <div className="card__backface"></div>
        </div>
        <img src="/images/avatar/projects.png" />
        <div ref={rightCardFlipRef} className="flippable-card">
          <div className="card__frontface">
            <img
              className="card__image"
              src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
              alt=""
            />
          </div>
          <div className="card__backface">
            <img
              className="card__image"
              src="https://images.pexels.com/photos/302743/pexels-photo-302743.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
