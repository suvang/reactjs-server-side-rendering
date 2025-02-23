import { Link } from "react-router-dom";

// About page component
const About = () => (
  <div>
    <h1>About Page</h1>
    <nav>
      <Link to="/">Home</Link> | <Link to="/contact">Contact</Link>
    </nav>
    <p>This is the About Page, where you learn more about us.</p>
  </div>
);

export default About;
