import { Link } from "react-router-dom";
import logo from "../assets/pixel-pirates-logo.jpeg";

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="nav-logo">
        <img
          src={logo}
          alt="Pixel Pirates Academy Logo"
        />

        <div className="brand-text">
          <span>PIXEL PIRATES</span>
          <small>ACADEMY</small>
        </div>
      </Link>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/achievements">Achievements</Link>
        <Link to="/events">Events</Link>
        <Link to="/team">Team</Link>
      </nav>

      <Link to="/register" className="nav-button">
        Register
      </Link>
    </header>
  );
}

export default Navbar;