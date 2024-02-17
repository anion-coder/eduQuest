import React, { useState } from "react";
import Icon from "../Images/Icon.svg";
import Dashboard from "../Images/dashboard.svg";
import Create from "../Images/create.svg";
import alltests from "../Images/transactions.svg";
import Performance from "../Images/performance.svg";
import Profile from "../Images/profile.svg";
import { useLocation } from "react-router-dom";
import { HiOutlinePlus } from "react-icons/hi";

const Sidebar = () => {
    const location = useLocation();

    const [closeMenu, setCloseMenu] = useState(false);

    const handleCloseMenu = () => {
        setCloseMenu(!closeMenu);
    };

    return (
        <div className={closeMenu === false ? "sidebar" : "sidebar active"}>
            <div
                className={
                    closeMenu === false
                        ? "logoContainer"
                        : "logoContainer active"
                }
            >
                <img src={Icon} alt="icon" className="logo" />
                <h2 className="title">EduQuest. </h2>
            </div>

            <a>____________________</a>
    
            <div
                className={
                    closeMenu === false
                        ? "contentsContainer"
                        : "contentsContainer active"
                }
            >
                <ul>
                    <li className={location.pathname === "/" ? "active" : ""}>
                        <img src={Dashboard} alt="dashboard" />
                        <a href="/">dashboard</a>
                    </li>
                    <li
                        className={
                            location.pathname === "/createtests"
                                ? "active"
                                : ""
                        }
                    >
                        <img src={Create} alt="createtests" />
                        <a href="/createtests">Create Test</a>
                    </li>
                    <li
                        className={
                            location.pathname === "/alltests" ? "active" : ""
                        }
                    >
                        <img src={alltests} alt="All Tests" />
                        <a href="/alltests">All Tests</a>
                    </li>
                    <li
                        className={
                            location.pathname === "/performance" ? "active" : ""
                        }
                    >
                        <img src={Performance} alt="Performance" />
                        <a href="/performance">performance</a>
                    </li>
                    <li
                        className={
                            location.pathname === "/news" ? "active" : ""
                        }
                    >
                        <img src={Profile} alt="Profile" />
                        <a href="/profile">Profile</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
