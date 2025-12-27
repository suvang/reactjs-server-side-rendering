import { Link } from "react-router-dom";

const Contact = () => (
  <div>
    <h1>Contact Page</h1>
    <nav>
      <Link to="/">Home</Link> | <Link to="/about">About</Link>
    </nav>
    <p>Get in touch with us on the Contact Page.</p>
  </div>
);

export default Contact;
