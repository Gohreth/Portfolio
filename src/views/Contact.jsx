import { useContext, useEffect, useRef } from "react";
import { UIContext } from "../App";
import AnimatedButton from "../components/AnimatedButton";
import { isInViewport } from "../helpers/viewportChecks";
import "./contact.css";

const Contact = () => {
  const contactRef = useRef(null);

  //Checks if section is in viewport
  /* useEffect(() => {
    const i = setInterval(() => {
      console.log(isInViewport(contactRef.current));
    }, 10000);

    return () => {
      clearInterval(i);
    };
  }, []); */
  const { addRef, removeRef } = useContext(UIContext);
  useEffect(() => {
    addRef(contactRef);

    return () => {
      removeRef(contactRef.current.id);
    };
  }, []);
  return (
    <div className="contact" id="contact" ref={contactRef}>
      <div className="information" style={{ gap: "5rem" }}>
        <form action="">
          <div className="input-group">
            <label htmlFor="mailName">Name</label>

            <input type="text" id="mailName" name="mailName" />
          </div>
          <div className="input-group">
            <label htmlFor="mailAddress">Email</label>

            <input type="text" id="mailAddress" name="mailAddress" />
          </div>
          <div className="input-group">
            <label htmlFor="mailMessage">Message</label>

            <textarea name="mailMessage" id="mailMessage" rows="10"></textarea>
          </div>
          <AnimatedButton>Contact me</AnimatedButton>
        </form>
        <img src="/images/avatar/contact.png" />
      </div>
    </div>
  );
};

export default Contact;
