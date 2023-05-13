import NavbarSignin from "../Navbar/NavbarSignin";

const LayoutSignin = ({ children }) => {
  return (
    <div>
      <NavbarSignin />
      {children}
    </div>
  );
};

export default LayoutSignin;
