import { Link } from "react-router-dom";
import logo from "../assets/pixel-pirates-logo.jpeg";

function Footer() {
  return (
    <footer className="footer">

      {/* BRAND */}
      <div className="footer-brand">
        <Link to="/">
          <img
            src={logo}
            alt="Pixel Pirates Academy"
          />
        </Link>

        <div>
          <h3>PIXEL PIRATES ACADEMY</h3>

          <p>
            Practical technology learning through building,
            experimentation and innovation.
          </p>
        </div>
      </div>


      {/* NAVIGATION */}
      <div className="footer-links">
        <Link to="/about">About</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/team">Team</Link>
        <Link to="/register">Register</Link>
      </div>


      {/* CONTACT */}
      <div
        className="footer-contact"
        style={{
          marginTop: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >

        <strong
          style={{
            fontSize: "12px",
            letterSpacing: "0.12em",
          }}
        >
          CONTACT
        </strong>

        <a
          href="mailto:pixelpiratesacademy@gmail.com"
          style={{
            color: "inherit",
            textDecoration: "none",
          }}
        >
          pixelpiratesacademy@gmail.com
        </a>

        <a
          href="tel:+917019683007"
          style={{
            color: "inherit",
            textDecoration: "none",
          }}
        >
          +91 7019683007
        </a>

        <a
          href="https://instagram.com/pixel_pirates_academy"
          target="_blank"
          rel="noreferrer"
          style={{
            color: "inherit",
            textDecoration: "none",
          }}
        >
          @pixel_pirates_academy
        </a>

      </div>


      {/* BOTTOM */}
      <div className="footer-bottom">
        <span>© 2026 Pixel Pirates Academy</span>

        <span>
          LEARN • BUILD • INNOVATE
        </span>
      </div>

    </footer>
  );
}

export default Footer;