import Navbar from "../Navbar/Navbar";

const LayoutNormal = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default LayoutNormal;
