import { useEffect, useReducer, useRef } from "react";
import { resizeWithDelay } from "../helpers/resizeWindowUpdate";
import useWindowDimensions from "../helpers/useWindowDimensions";
import AnimatedCanvas from "./AnimatedCanvas";

import "./projects.css";

const INITIAL_STATE = {
  id: 0,
  distanceBetween: null,
  isTransformed: false, //Set to know if card were translated
  animationDuration: 6,
  leftPosition: 0,
  leftRotation: 0,
  rightPosition: 0,
  rightRotation: 0,
};

const flipReducer = (state, action) => {
  switch (action.type) {
    case "distance":
      return { ...state, distanceBetween: action.payload };
    case "transformLeft":
      if (!state.isTransformed) {
        return {
          ...state,
          id: state.id - 1 < 0 ? PROJECTS.length - 1 : state.id - 1,
          isTransformed: !state.isTransformed,
          leftPosition: state.leftPosition - state.distanceBetween,
          leftRotation: state.leftRotation - 180,
          rightPosition: state.rightPosition + state.distanceBetween,
          rightRotation: state.rightRotation - 180,
        };
      } else {
        return {
          ...state,
          id: state.id - 1 < 0 ? PROJECTS.length - 1 : state.id - 1,
          isTransformed: !state.isTransformed,
          leftPosition: state.leftPosition + state.distanceBetween,
          leftRotation: state.leftRotation - 180,
          rightPosition: state.rightPosition - state.distanceBetween,
          rightRotation: state.rightRotation - 180,
        };
      }
    case "transformRight":
      if (!state.isTransformed) {
        return {
          ...state,
          id: state.id + 1 >= PROJECTS.length ? 0 : state.id + 1,
          isTransformed: !state.isTransformed,
          leftPosition: state.leftPosition - state.distanceBetween,
          leftRotation: state.leftRotation + 180,
          rightPosition: state.rightPosition + state.distanceBetween,
          rightRotation: state.rightRotation + 180,
        };
      } else {
        return {
          ...state,
          id: state.id + 1 >= PROJECTS.length ? 0 : state.id + 1,
          isTransformed: !state.isTransformed,
          leftPosition: state.leftPosition + state.distanceBetween,
          leftRotation: state.leftRotation + 180,
          rightPosition: state.rightPosition - state.distanceBetween,
          rightRotation: state.rightRotation + 180,
        };
      }
    default:
      throw new Error("Something went wrong");
  }
};

const PROJECTS = [
  {
    id: "#001",
    name: "bGames Dashboard",
    status: "Finished",
    description:
      "Dashboard for a videogame framework called bGames or Blended Games, where users can publish their creations, manage their contributions and get selected to review another application published.",
  },
  {
    id: "#002",
    name: "Personal Portfolio",
    status: "Unfinished",
    description:
      "Portfolio to showcase myselft, my skills and personal projects, it will be updated everytime I learn another technology or skill and when I start another personal project.",
  },
];

const Projects = () => {
  const leftCardFlipRef = useRef(null);
  const rightCardFlipRef = useRef(null);
  const { width, height } = useWindowDimensions();
  const [state, dispatch] = useReducer(flipReducer, INITIAL_STATE);

  useEffect(() => {
    //Values are bugged when reloading page (changes to 200), payload hardcoded because of that
    console.log(rightCardFlipRef.current.offsetLeft);

    dispatch({
      type: "distance",
      payload: rightCardFlipRef.current.offsetLeft, //TO-DO: Fix hardcoded value
    });

    window.addEventListener("resize", () => {
      resizeWithDelay(300, rightCardFlipRef.current.offsetLeft, dispatch);
    });

    return () => {
      window.removeEventListener("resize", () => {
        resizeWithDelay(300, rightCardFlipRef.current.offsetLeft, dispatch);
      });
    };
  }, []);

  useEffect(() => {
    if (rightCardFlipRef.current) {
      console.log("cambop offsety");
    }
  }, [rightCardFlipRef.current]);
  return (
    <div className="projects" id="projects">
      {width <= 767 && (
        <img className="avatar-miniature" src="/images/avatar/projects.png" />
      )}
      <div
        className="information container3d"
        style={{ columnGap: width > 1060 ? "0" : "2rem" }}
      >
        <div
          ref={leftCardFlipRef}
          className="flippable-card"
          style={{
            transform: `rotateY(${state.leftRotation}deg) translateX(${state.leftPosition}px)`,
          }}
          onClick={() =>
            state.isTransformed
              ? dispatch({ type: "transformRight" })
              : dispatch({ type: "transformLeft" })
          }
        >
          <div className="card__frontface">
            <img
              className="card__image"
              src="https://images.pexels.com/photos/302743/pexels-photo-302743.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt=""
            />
            <div className="card__description--left"></div>
            <div className="description__status--left">
              {PROJECTS[0].status}
            </div>
            <div className="description__id--left">{PROJECTS[0].id}</div>
            <div className="description__name--left">{PROJECTS[0].name}</div>
          </div>
          <div className="card__backface">
            <img
              className="card__image"
              src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
              alt=""
            />
            <div className="card__description--right"></div>
            <div className="description__status--right">
              {PROJECTS[1].status}
            </div>
            <div className="description__id--right">{PROJECTS[1].id}</div>
            <div className="description__name--right">{PROJECTS[1].name}</div>
          </div>
        </div>
        {width > 1060 && (
          <img className="avatar-image" src="/images/avatar/projects.png" />
        )}

        <div
          ref={rightCardFlipRef}
          className="flippable-card"
          style={{
            transform: `rotateY(${state.rightRotation}deg) translateX(${state.rightPosition}px)`,
          }}
          onClick={() =>
            state.isTransformed
              ? dispatch({ type: "transformLeft" })
              : dispatch({ type: "transformRight" })
          }
        >
          <div className="card__frontface">
            <div className="description__content">
              {PROJECTS[0].description}
            </div>
          </div>
          <div className="card__backface">
            <div className="description__content">
              {PROJECTS[1].description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
