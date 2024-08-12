import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../assets/css/user/profile/Profile.css";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import OrderDetails from "./OrderDetails";

const Profile = () => {
  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    addresses: [],
  });
  const [activeSection, setActiveSection] = useState("details");
  const { handleLogout, userId } = useAuth(); // Get userId from AuthContext
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!userId) return; // Skip fetching if userId is not available

      try {
        const response = await fetch(
          `http://localhost:5000/api/auth/${userId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`); // More descriptive error
        }
        const data = await response.json();
        // Adjusted to match the backend attributes
        setUser({
          email: data.email,
          firstName: data.first_name,
          lastName: data.last_name,
          phone: data.phone,
          addresses: [], // Assuming addresses are fetched elsewhere
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
        toast.error("Failed to load user details.");
      }
    };

    const fetchUserAddresses = async () => {
      if (!userId) return; // Skip fetching if userId is not available

      try {
        const response = await fetch(
          `http://localhost:5000/api/addresses/${userId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setUser((prevUser) => ({
          ...prevUser,
          addresses: data.data || [], // Use data or empty array if no data
        }));
      } catch (error) {
        console.error("Error fetching addresses:", error);
        toast.error("Failed to load addresses.");
      }
    };

    fetchUserDetails();
    fetchUserAddresses();
  }, [userId]);

  const handle_Logout = () => {
    handleLogout();
    navigate("/login");
    toast.success("Logged out successfully!");
  };

  return (
    <div className="profile-container">
      <div className="profile-sidenav">
        <h2>
          <i className="fas fa-user-circle"></i> Profile
        </h2>
        <ul>
          <li onClick={() => setActiveSection("details")}>
            <i className="fas fa-info-circle"></i> My Details
          </li>
          <li onClick={() => setActiveSection("orders")}>
            <i className="fas fa-box"></i> Orders
          </li>
          <li onClick={() => setActiveSection("wishlist")}>
            <i className="fas fa-heart"></i> My Wishlist
          </li>
          <li onClick={() => setActiveSection("notifications")}>
            <i className="fas fa-bell"></i> Notifications
          </li>
          <li onClick={handle_Logout}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </li>
        </ul>
      </div>
      <div className="profile-content">
        {activeSection === "details" && (
          <div className="profile-details">
            <h2>Personal Information</h2>
            <div className="profile-details-info">
              <div>
                <strong>Email</strong>
                <p>: {user.email}</p>
              </div>
              <div>
                <strong>First Name</strong>
                <p>: {user.firstName}</p>
              </div>
              <div>
                <strong>Last Name</strong>
                <p>: {user.lastName}</p>
              </div>
              <div>
                <strong>Phone</strong>
                <p>: {user.phone}</p>
              </div>
            </div>
            <div className="profile-addresses">
              <h2>Addresses</h2>
              {user.addresses.length === 0 ? (
                <p>No address found.</p>
              ) : (
                <div className="address-list">
                  {user.addresses.map((address) => (
                    <div key={address.id} className="address-item">
                      <p>
                        <strong>Street:</strong> {address.street}
                      </p>
                      <p>
                        <strong>City:</strong> {address.city}
                      </p>
                      <p>
                        <strong>State:</strong> {address.state}
                      </p>
                      <p>
                        <strong>Postal Code:</strong> {address.postal_code}
                      </p>
                      <p>
                        <strong>Country:</strong> {address.country}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              <button
                className="add-address-button"
                onClick={() => navigate(`/user/add-address/${userId}`)}
              >
                Add Address
              </button>
            </div>
          </div>
        )}
        {activeSection === "orders" && (
          <div className="profile-orders">
            <h2>My Orders</h2>
            <OrderDetails />
          </div>
        )}
        {activeSection === "wishlist" && (
          <div className="profile-wishlist">
            <h2>My Wishlist</h2>
            <p>Wishlist items will be displayed here.</p>
          </div>
        )}
        {activeSection === "notifications" && (
          <div className="profile-notifications">
            <h2>Notifications</h2>
            <p>Notification settings will be displayed here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
