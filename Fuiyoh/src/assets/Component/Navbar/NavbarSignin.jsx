import "./Navbar.css";
import mainLogo from "../../Picture/icon/logo.svg";

const NavbarSignin = () => {
  return (
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
          <a href={"/dashboard"}>
            <b>dashboard</b>
          </a>
        </li>
        <li>
          <a href={"/Login"}>
            <button type="button" id="navbar-login-btn">
              <b>Log out</b>
            </button>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarSignin;
