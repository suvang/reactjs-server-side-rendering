import pkg from "react-router-dom";
const { Link } = pkg;
import Metadata from "../components/Metadata";

const Contact = () => (
  <>
    <Metadata
      title="Contact Us - SSR React Vite App"
      description="Get in touch with us! We'd love to hear from you. Contact us for inquiries, support, or collaboration opportunities."
      keywords="contact, get in touch, support, inquiry, react, vite"
      ogTitle="Contact Us - SSR React Vite App"
      ogDescription="Get in touch with us! We'd love to hear from you."
      ogImage="https://via.placeholder.com/1200x630?text=Contact+Us"
      ogType="website"
      twitterCard="summary_large_image"
    />
    <div>
      <h1>Contact Page</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <p>Get in touch with us on the Contact Page.</p>
    </div>
  </>
);

export default Contact;
