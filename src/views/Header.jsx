import "./header.css";

const Header = () => {
  return (
    <div className="navbar">
      <h1 className="logo">SC</h1>
      <li className="sections">
        <ul>
          <a href="#about">About</a>
        </ul>
        <ul>
          <a href="#projects">Projects</a>
        </ul>
        <ul>
          <a href="#contact">Contact</a>
        </ul>
      </li>
    </div>
  );
};

export default Header;
