import pkg from "react-router-dom";
const { Link } = pkg;
import Metadata from "../components/Metadata";

const Home = () => {
  return (
    <>
      <Metadata
        title="Home - SSR React Vite App"
        description="Welcome to our SSR-enabled React application built with Vite. Experience fast server-side rendering and dynamic metadata support."
        keywords="react, vite, ssr, server-side rendering, meta tags"
        ogTitle="Home - SSR React Vite App"
        ogDescription="Welcome to our SSR-enabled React application built with Vite."
        ogImage="https://via.placeholder.com/1200x630?text=Home+Page"
        ogType="website"
        twitterCard="summary_large_image"
      />
      <div>
        <h1>Home Page</h1>
        <nav>
          <Link to="/about">About</Link> | <Link to="/contact">Contact</Link>
        </nav>
        <p>Welcome to the Home Page!</p>
      </div>
    </>
  );
};

export default Home;
