import React from 'react';
import styled from "styled-components";
import {signout} from "../../utils/Icons";
import {menuItems} from "../../utils/menuItems";

// its Here where we need to create an avatar under img so we can import it in this class
function Navigation(props) {
    return (
        <NavStyled>
            <div className="user-con">
                <img src={avatar} alt="" />
                <div className="text">
                    <h2>Dave</h2>
                    <p>Your Money</p>
                </div>
            </div>
            <ul className="menu-items">
                {menuItems.map((item) => {
                    return <li
                        key={item.id}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                })}
            </ul>
            <div className="bottom-nav">
                <li>
                    {signout} Sign Out
                </li>
            </div>
        </NavStyled>
    )
}

// error on styled because we have not started on styling it yet.
const NavStyled = styled.nav´
´;
export default Navigation;