import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Icon from "../../assets/images/logo.png"; // Logo image
import { FaTachometerAlt, FaUsers, FaBox, FaClipboardList, FaCog, FaSignOutAlt, FaAppStore } from "react-icons/fa"; // React Icons
import '../../assets/css/productpartner/Sidebar.css'; // CSS file for admin
import { AuthContext } from "../contexts/AuthContext";

const Sidebar = () => {
    const navigate = useNavigate();
    const { handleLogout } = useContext(AuthContext);
    const location = useLocation();
    const [closeMenu, setCloseMenu] = useState(true);
    const [activePath, setActivePath] = useState(location.pathname);

    const handleCloseMenu = () => {
        setCloseMenu(!closeMenu);
    };

    const handleNavigation = (path) => {
        navigate(`/admin${path}`);
        setActivePath(`/admin${path}`);
    };

    const handleLogoutClick = () => {
        handleLogout();
        navigate('/login');
    };

    useEffect(() => {
        setActivePath(location.pathname);
    }, [location.pathname]);

    return (
        <div className={closeMenu ? "sidebar active" : "sidebar"}>
            <div className={closeMenu ? "logoContainer active" : "logoContainer"}>
                <Link to="/admin">
                    <img src={Icon} alt="Twistmart" className="logo" />
                </Link>
            </div>
            <div className={closeMenu ? "burgerContainer active" : "burgerContainer"}>
                <div className="burgerTrigger" onClick={handleCloseMenu}></div>
                <div className="burgerMenu"></div>
            </div>
            <div className={closeMenu ? "profileContainer active" : "profileContainer"}>
                <div className={closeMenu ? "profileContents active" : "profileContents"}>
                    <p className="name">Hello, Admin</p>
                    <p>admin@twistmart.com</p>
                </div>
            </div>
            <div className={closeMenu ? "contentsContainer active" : "contentsContainer"}>
                <ul>
                    <li
                        className={activePath === "/admin/dashboard" ? "active" : ""}
                        onClick={() => handleNavigation("/dashboard")}
                    >
                        <FaTachometerAlt size={24} />
                        <span>Dashboard</span>
                    </li>
                    <li
                        className={activePath === "/admin/user-details" ? "active" : ""}
                        onClick={() => handleNavigation("/user-details")}
                    >
                        <FaUsers size={24} />
                        <span>User details</span>
                    </li>
                    <li
                        className={activePath === "/admin/product-partners" ? "active" : ""}
                        onClick={() => handleNavigation("/product-partners")}
                    >
                        <FaBox size={24} />
                        <span>Product partners</span>
                    </li>
                    <li
                        className={activePath === "/admin/applications-details" ? "active" : ""}
                        onClick={() => handleNavigation("/applications-details")}
                    >
                        <FaAppStore size={24} />
                        <span>Applications details</span>
                    </li>
                    <li
                        className={activePath === "/admin/order-details" ? "active" : ""}
                        onClick={() => handleNavigation("/order-details")}
                    >
                        <FaClipboardList size={24} />
                        <span>Order details</span>
                    </li>
                    <li
                        className={activePath === "/admin/settings" ? "active" : ""}
                        onClick={() => handleNavigation("/settings")}
                    >
                        <FaCog size={24} />
                        <span>Settings</span>
                    </li>
                    <li className="logout" onClick={handleLogoutClick}>
                        <FaSignOutAlt size={24} />
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
