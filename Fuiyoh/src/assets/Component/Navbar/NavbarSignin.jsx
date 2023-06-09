import "./Navbar.css";
import mainLogo from "../../Picture/icon/logo.svg";
import { getUserId, logout } from "../../service/authorize";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const NavbarSignin = () => {
  const userId = getUserId();
  const navigate = useNavigate();
  return (
    <header>
      <nav className="navbar">
        <div className="left-navbar">
          <Link to={`/dashboard/${userId}`}>
            <div>
              <img src={mainLogo} alt="main Logo" />
            </div>
            <p>
              <b>YUNWHANG</b>
            </p>
          </Link>
        </div>

        <ul className="right-navbar">
          <li>
            <Link to={`/dashboard/${userId}`}>
              <b>dashboard</b>
            </Link>
          </li>
          <li>
            <button
              type="button"
              id="navbar-login-btn"
              onClick={() =>
                Swal.fire({
                  title: "คุณต้องการ Log Out ใช่หรือไม่",
                  icon: "warning",
                  showCancelButton: true,
                }).then((result) => {
                  if (result.isConfirmed) {
                    Swal.fire({
                      icon: "success",
                      title: "Logged Out",
                      showConfirmButton: false,
                      timer: 2000,
                    });
                    logout(()=>navigate('/login'));
                  }
                })
              }
            >
              <b>Log out</b>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavbarSignin;
