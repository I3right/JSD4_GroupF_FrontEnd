import "./Navbar.css";
import mainLogo from "../../Picture/icon/logo.svg";

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
          <a href={"/Login"}>
            <button type="button" id="navbar-login-btn">
              <b>Log In</b>
            </button>
          </a>
        </li>
      </ul>
    </nav>
    </header>
  );
};

export default Navbar;
