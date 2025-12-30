import pkg from "react-router-dom";
const { Link } = pkg;
import Metadata from "../components/Metadata";

// About page component
const About = () => (
  <>
    <Metadata
      title="About Us - SSR React Vite App"
      description="Learn more about our company and mission. We build amazing SSR-enabled React applications with modern tooling."
      keywords="about, company, mission, react, vite, ssr"
      ogTitle="About Us - SSR React Vite App"
      ogDescription="Learn more about our company and mission."
      ogImage="https://via.placeholder.com/1200x630?text=About+Us"
      ogType="website"
      twitterCard="summary_large_image"
    />
    <div>
      <h1>About Page</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="/contact">Contact</Link>
      </nav>
      <p>This is the About Page, where you learn more about us.</p>
    </div>
  </>
);

export default About;
