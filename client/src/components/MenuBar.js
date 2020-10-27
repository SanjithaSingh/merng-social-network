import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { AuthContext } from "../context/AuthContext";

function MenuBar() {
  const handleItemClick = (e, { name }) => setActiveItem(name);
  const pathname = window.location.pathname;

  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);
  const context = useContext(AuthContext);
  return (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item name="home" active={activeItem === "home"} as={Link} to="/" />
      {context.user ? (
        <Menu.Menu position="right">
          <Menu.Item name="logout" onClick={context.logout} />
        </Menu.Menu>
      ) : (
        <Menu.Menu position="right">
          <Menu.Item
            name="login"
            active={activeItem === "login"}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />

          <Menu.Item
            name="register"
            active={activeItem === "register"}
            onClick={handleItemClick}
            as={Link}
            to="/register"
          />
        </Menu.Menu>
      )}
    </Menu>
  );
}

export default MenuBar;
