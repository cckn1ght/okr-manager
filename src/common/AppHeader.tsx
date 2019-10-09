import React from 'react';
import {
    Link,
    withRouter,
    RouteComponentProps
} from 'react-router-dom';
import './AppHeader.css';
import {Layout, Menu, Dropdown, Icon} from 'antd';
import {UserEntity} from "../constants/payload";

const Header = Layout.Header;

interface AppHeaderProps {
    isAuthenticated: boolean;
    onLogout: () => void;
    currentUser: UserEntity | null;
}
interface ProfileProps {
    currentUser: UserEntity;
    handleMenuClick: (key: string) => void;
}

const AppHeader: React.FC<RouteComponentProps & AppHeaderProps> =
    (props: RouteComponentProps & AppHeaderProps) => {

    const handleMenuClick = (key: string) => {
        if (key === "logout") {
            props.onLogout();
        }
    };

    const menuItems = (currentUser: UserEntity | null) => {
        let items;
        if (currentUser) {
            items = [
                <Menu.Item key="/">
                    <Link to="/">
                        <Icon type="home" className="nav-icon"/>
                    </Link>
                </Menu.Item>,
                <Menu.Item key="/user_list">
                    <Link to="/user_list/1">
                        <Icon type="usergroup-delete" className="nav-icon" />
                    </Link>
                </Menu.Item>,
                <Menu.Item key="/profile" className="profile-menu">
                    <ProfileDropdownMenu
                        currentUser={currentUser}
                        handleMenuClick={handleMenuClick}/>
                </Menu.Item>
            ]
        } else {
            items = [
                <Menu.Item key="/login">
                    <Link to="/login">Login</Link>
                </Menu.Item>,
                <Menu.Item key="/signup">
                    <Link to="/signup">Signup</Link>
                </Menu.Item>
            ]
        }
        return items;
    };
    return (
        <Header className="app-header">
            <div className="container">
                <div className="app-title">
                    <Link to="/">OKR Manager</Link>
                </div>
                <Menu
                    className="app-menu"
                    mode="horizontal"
                    selectedKeys={[props.location.pathname]}
                    style={{lineHeight: '64px'}}>
                    {menuItems(props.currentUser)}
                </Menu>
            </div>
        </Header>
    )
};

const ProfileDropdownMenu: React.FC<ProfileProps> = (props: ProfileProps) => {
    const dropdownMenu = (
        <Menu onClick={pram => props.handleMenuClick(pram.key)} className="profile-dropdown-menu">
            <Menu.Item key="user-info" className="dropdown-item" disabled>
                <div className="user-full-name-info">
                    {props.currentUser.name}
                </div>
                <div className="username-info">
                    {props.currentUser.username}
                </div>
            </Menu.Item>
            <Menu.Divider/>
            {/*<Menu.Item key="profile" className="dropdown-item">*/}
            {/*    <Link to={`/users/${props.currentUser.email}`}>Profile</Link>*/}
            {/*</Menu.Item>*/}
            <Menu.Item key="logout" className="dropdown-item">
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown
            overlay={dropdownMenu}
            trigger={['click']}
            getPopupContainer={() => document.getElementsByClassName('profile-menu')[0] as HTMLElement}
        >
            <a className="ant-dropdown-link">
                <Icon type="user" className="nav-icon" style={{marginRight: 0}}/> <Icon type="down"/>
            </a>
        </Dropdown>
    );
};


export default withRouter(AppHeader);