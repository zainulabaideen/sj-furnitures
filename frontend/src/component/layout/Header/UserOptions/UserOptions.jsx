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



  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ExitToAppIcon />, name: "logout", func: logoutUser },
  ]

  if (user.role === "admin") {
    options.unshift({ icon: <DashboardIcon />, name: "Dashboard", func: dashboard })
  }
  function dashboard() {
    navigate("/dashboard");
  }
  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }

  function logoutUser() {
    dispatch(logout()); // Call your Redux logout action
    toast.success("Logout successfully", { toastId: "logoutSuccess" });

    window.dispatchEvent(new Event("logout")); // Also emit a custom event if needed
  }



  return (
    <Fragment>
      <SpeedDial
        ariaLabel='SpeedDial tooltip example'
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction='down'
        style={{zIndex: "11"}}
        className='speedDial'
        icon={
          <img
            className='speedDialIcon'
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt='Profile'
          />

        }
      >
        {options.map((item, i) => (
          <SpeedDialAction
            key={item.name + i} // ✅ unique key
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
          />
        ))}


      </SpeedDial>
    </Fragment>
  )
}

export default UserOptions 