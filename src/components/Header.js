import { Link } from "react-router-dom";

import React from "react";

const Header = () => {
  // <Link to="//">customers</Link>
  // <Link to="/loadLoginHtml()">Log In</Link>
  return (
    <header>
      <span id="tabs">
        <Link to="/contacts">Contacts</Link>
        <Link to="/customers">Customers</Link>
        <Link to="/prjCusLinks">Prj Cus Links</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/recItems">Rec Items</Link>
        <Link to="/records">Records</Link>
      </span>
      <span id="settings">
        <Link to="">Log In</Link>
      </span>
    </header>
  );
};

export default Header;
