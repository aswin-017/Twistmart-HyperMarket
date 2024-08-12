import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Icon from "../../assets/images/logo.png"; // Logo image
import { FaTachometerAlt, FaBox, FaClipboardList, FaChartLine, FaCog, FaLifeRing, FaSignOutAlt } from "react-icons/fa"; // React Icons
import '../../assets/css/productpartner/Sidebar.css'; // CSS file
import { AuthContext } from "../contexts/AuthContext";

const Sidebar = () => {
    const navigate = useNavigate();
    const { handleLogout } = useContext(AuthContext);
    const location = useLocation();
    const [closeMenu, setCloseMenu] = useState(false);
    const [activePath, setActivePath] = useState(location.pathname);

    const handleCloseMenu = () => {
        setCloseMenu(!closeMenu);
    };

    const handleNavigation = (path) => {
        navigate(`/product_partner${path}`);
        setActivePath(`/product_partner${path}`);
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
                <img src={Icon} alt="Twistmart" className="logo" />
            </div>
            <div className={closeMenu ? "burgerContainer active" : "burgerContainer"}>
                <div className="burgerTrigger" onClick={handleCloseMenu}></div>
                <div className="burgerMenu"></div>
            </div>
            <div className={closeMenu ? "profileContainer active" : "profileContainer"}>
                <div className={closeMenu ? "profileContents active" : "profileContents"}>
                    <p className="name">Hello, Product Partner</p>
                    <p>partner@twistmart.com</p>
                </div>
            </div>
            <div className={closeMenu ? "contentsContainer active" : "contentsContainer"}>
                <ul>
                    <li
                        className={activePath === "/product_partner/dashboard" ? "active" : ""}
                        onClick={() => handleNavigation("/dashboard")}
                    >
                        <FaTachometerAlt size={24} />
                        <span>Dashboard</span>
                    </li>
                    <li
                        className={activePath === "/product_partner/product-details" ? "active" : ""}
                        onClick={() => handleNavigation("/product-details")}
                    >
                        <FaBox size={24} />
                        <span>Product Details</span>
                    </li>
                    <li
                        className={activePath === "/product_partner/add-product" ? "active" : ""}
                        onClick={() => handleNavigation("/add-product")}
                    >
                        <FaClipboardList size={24} />
                        <span>Add Product</span>
                    </li>

                    <li
                        className={activePath === "/product_partner/manage-orders" ? "active" : ""}
                        onClick={() => handleNavigation("/manage-orders")}
                    >
                        <FaChartLine size={24} />
                        <span>Manage Orders</span>
                    </li>
                    {/* <li
                        className={activePath === "/product_partner/settings" ? "active" : ""}
                        onClick={() => handleNavigation("/settings")}
                    >
                        <FaCog size={24} />
                        <span>Settings</span>
                    </li> */}
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
