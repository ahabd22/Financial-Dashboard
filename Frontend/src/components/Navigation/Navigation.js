import React from 'react';
import styled from 'styled-components';
import avatar from '../../img/Avatar.jpg';
import { signout } from '../../utils/Icons';
import { menuItems } from '../../utils/menuItems';

function Navigation({ active, setActive }) {
    return (
        <NavStyled>
            <UserInfo>
                <Avatar src={avatar} alt="User Avatar" />
                <UserText>
                    <UserName>Kasper</UserName>
                    <UserSubtext>Your Finances</UserSubtext>
                </UserText>
            </UserInfo>
            <MenuList>
                {menuItems.map((item) => (
                    <MenuItem
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        active={active === item.id}
                    >
                        <MenuIcon>{item.icon}</MenuIcon>
                        <MenuText>{item.title}</MenuText>
                    </MenuItem>
                ))}
            </MenuList>
            <BottomNav>
                <SignOutButton>
                    <SignOutIcon>{signout}</SignOutIcon>
                    <span>Sign Out</span>
                </SignOutButton>
            </BottomNav>
        </NavStyled>
    );
}

const NavStyled = styled.nav`
    width: 275px;
    height: 100vh;
    background: linear-gradient(to bottom, #2c3e50, #34495e);
    color: #ecf0f1;
    display: flex;
    flex-direction: column;
    font-family: 'Roboto', sans-serif;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    overflow-y: auto;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    padding: 30px 20px;
    background: rgba(52, 73, 94, 0.5);
    border-bottom: 1px solid rgba(236, 240, 241, 0.1);
`;

const Avatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
    border: 2px solid #ecf0f1;
    box-shadow: 0 0 10px rgba(236, 240, 241, 0.3);
`;

const UserText = styled.div`
    display: flex;
    flex-direction: column;
`;

const UserName = styled.h2`
    font-size: 18px;
    margin: 0;
    font-weight: 600;
`;

const UserSubtext = styled.p`
    font-size: 14px;
    margin: 5px 0 0;
    opacity: 0.7;
`;

const MenuList = styled.ul`
    list-style-type: none;
    padding: 20px 0;
    margin: 0;
`;

const MenuItem = styled.li`
    display: flex;
    align-items: center;
    padding: 15px 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    border-left: 4px solid transparent;
    background: ${props => props.active ? 'rgba(236, 240, 241, 0.1)' : 'transparent'};
    border-left-color: ${props => props.active ? '#3498db' : 'transparent'};

    &:hover {
        background: rgba(236, 240, 241, 0.05);
    }
`;

const MenuIcon = styled.span`
    margin-right: 15px;
    font-size: 20px;
    width: 20px;
    display: flex;
    justify-content: center;
    color: ${props => props.active ? '#3498db' : 'inherit'};
`;

const MenuText = styled.span`
    font-size: 16px;
    font-weight: ${props => props.active ? '600' : '400'};
`;

const BottomNav = styled.div`
    margin-top: auto;
    padding: 20px;
    border-top: 1px solid rgba(236, 240, 241, 0.1);
`;

const SignOutButton = styled.button`
    display: flex;
    align-items: center;
    background: none;
    border: none;
    color: #ecf0f1;
    cursor: pointer;
    font-size: 16px;
    padding: 10px;
    transition: all 0.3s ease;

    &:hover {
        color: #e74c3c;
    }
`;

const SignOutIcon = styled.span`
    margin-right: 10px;
    font-size: 18px;
`;

export default Navigation;