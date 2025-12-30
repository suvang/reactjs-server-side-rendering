import pkg from "react-router-dom";
const { Link } = pkg;
import Metadata from "../components/Metadata";

const NotFound = () => (
  <>
    <Metadata
      title="404 - Page Not Found"
      description="The page you're looking for doesn't exist. Return to our homepage to continue browsing."
      keywords="404, not found, error"
      ogTitle="404 - Page Not Found"
      ogDescription="The page you're looking for doesn't exist."
      ogType="website"
    />
    <div>
      <h1>404 - Page Not Found</h1>
      <nav>
        <Link to="/">Go Back Home</Link>
      </nav>
    </div>
  </>
);

export default NotFound;
