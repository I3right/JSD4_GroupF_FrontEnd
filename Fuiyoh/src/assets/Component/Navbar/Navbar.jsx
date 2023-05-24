import "./Navbar.css";
import mainLogo from "../../Picture/icon/logo.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
    <nav className="navbar">
      <div className="left-navbar">
        <a href={"/"}>
          <div>
            <img src={mainLogo} alt="main Logo" />
          </div>
          <p>
            <b>YUNWHANG</b>
          </p>
        </a>
      </div>

      <ul className="right-navbar">
        <li>
          <a href={"/"}>
            <b>Home</b>
          </a>
        </li>
        <li>
          <Link to={"/login"}>
            <button type="button" id="navbar-login-btn">
              <b>Log In</b>
            </button>
          </Link>
        </li>
      </ul>
    </nav>
    </header>
  );
};

export default Navbar;
