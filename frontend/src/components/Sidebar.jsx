import { GoHome } from "react-icons/go";
import { SlCalender } from "react-icons/sl";
import { FaDraftingCompass } from "react-icons/fa";
import { GrPieChart } from "react-icons/gr";
import { FaRegPlusSquare } from "react-icons/fa";
import { TiCogOutline } from "react-icons/ti";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../hook/useAuth";

const Sidebar = () => {
  const navigate = useNavigate();
  // const { user, logout } = useAuth;
  const handleLogout = () => {
    // logout.nutate();
    navigate("/login");
  };

  return (
    <div
      className="sidebar"
      style={{
        width: "5vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        background: "#333",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px 0"
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        <GoHome size="1.5rem" style={{ cursor: "pointer" }} />
        <SlCalender size="1.5rem" style={{ cursor: "pointer" }} />
        <FaDraftingCompass size="1.5rem" style={{ cursor: "pointer" }} />
        <GrPieChart size="1.5rem" style={{ cursor: "pointer" }} />
        <FaRegPlusSquare size="1.5rem" style={{ cursor: "pointer" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        <TiCogOutline size="1.5rem" style={{ cursor: "pointer" }} />

        <MdLogout
          size="1.5rem"
          style={{ cursor: "pointer" }}
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default Sidebar;
