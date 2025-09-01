import React, { Fragment, useState } from 'react'
import "./UserOptions.css"
import { SpeedDial, SpeedDialAction } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { createBrowserHistory } from 'history';
import { logout } from '../../../../actions/userActions';
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const UserOptions = ({ user }) => {
  const history = createBrowserHistory();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("UserOptions user:", user);

  // Guard: if user is not loaded yet, don’t render anything
  if (!user) return null;

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user?.role?.toLowerCase() === "admin") {
    options.unshift({ icon: <DashboardIcon />, name: "Dashboard", func: dashboard });
  }


  function dashboard() {
    navigate("/admin/dashboard");
  }
  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }
  function logoutUser() {
    dispatch(logout());
    toast.success("Logout successfully", { toastId: "logoutSuccess" });
    window.dispatchEvent(new Event("logout"));
  }




  return (
    <Fragment>
      <SpeedDial
        ariaLabel='SpeedDial tooltip example'
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction='down'
        style={{ zIndex: "1000" }}
        className='speedDial md:top-20 top-24 '
        icon={
          <img
            className='speedDialIcon'
            src={user?.avatar?.url || "/default-avatar.jpg"} // ✅ safe check
            alt='Profile'
            onError={(e) => {
              e.currentTarget.onerror = null; // prevent infinite loop if fallback also fails
              e.currentTarget.src = "/default-avatar.jpg";
            }}
          />
        }
      >
        {options.map((item, i) => (
          <SpeedDialAction
            key={item.name + i}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};



export default UserOptions 