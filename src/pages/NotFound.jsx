import { Link } from "react-router-dom";

const NotFound = () => (
  <div>
    <h1>404 - Page Not Found</h1>
    <nav>
      <Link to="/">Go Back Home</Link>
    </nav>
  </div>
);

export default NotFound;
