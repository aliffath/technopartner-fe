import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaClipboardList } from "react-icons/fa";

function BottomNav() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const isActive = (path) => activeLink === path;
  const iconStyle = (path) => ({
    color: isActive(path) ? "#242424" : "#A7A7A7",
    fontWeight: isActive(path) ? "bold" : "normal",
    fontSize: "24px",
  });

  const textStyle = (path) => (isActive(path) ? "font-bold text-[#242424] text-[12px]" : "font-normal text-[12px] text-[#A7A7A7]");

  return (
    <div className="bg-white w-full px-4 py-2 shadow-md">
      <div className="flex justify-around gap-5 items-center w-full">
        <Link to="/home">
          <div className="flex flex-col items-center justify-center gap-1">
            <FaHome style={iconStyle("/home")} />
            <p className={textStyle("/home")}>Home</p>
          </div>
        </Link>

        <Link to="/menu">
          <div className="flex flex-col items-center justify-center gap-1">
            <FaClipboardList style={iconStyle("/menu")} />
            <p className={textStyle("/menu")}>Menu</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default BottomNav;
