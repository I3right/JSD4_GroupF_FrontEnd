import "./Navbar.css";
import mainLogo from "../../Picture/icon/logo.svg";
import { getUserId,logout } from "../../service/authorize";
import { useNavigate } from "react-router-dom";

const NavbarSignin = () => {
  const userId = getUserId();
  const navigate = useNavigate();
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
          <a href={`/dashboard/${userId}`}>
            <b>dashboard</b>
          </a>
        </li>
        <li>
          <a >
            <button type="button" id="navbar-login-btn" onClick={() =>logout(() => navigate("/"))}>
              <b>Log out</b>
            </button>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarSignin;
