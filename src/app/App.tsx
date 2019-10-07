import React, {useEffect, useState} from 'react';
import './App.scss';
import {
    Route,
    withRouter,
    Switch, RouteComponentProps
} from 'react-router-dom';

import {ACCESS_TOKEN} from '../constants';

import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import AppHeader from '../common/AppHeader';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';

import {Layout, notification} from 'antd';
import {UserEntity} from "../constants/payload";
import {getCurrentUser} from "../util/UserApi";
import {OkrView} from "../okr_view";

const {Content} = Layout;

const App: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
    // this.state = {
    //     currentUser: null,
    //     isAuthenticated: false,
    //     isLoading: false
    // }
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState<UserEntity | null>(null);
    const [needLoadUser, setNeedLoadUser] = useState(false);

    notification.config({
        placement: 'topRight',
        top: 70,
        duration: 3,
    });

    useEffect(() => {
        setIsLoading(true);
        (async () => {
            try {
                const user = await getCurrentUser();
                setCurrentUser(user);
                setIsAuthenticated(true);
            } catch {
                setIsAuthenticated(false);
            }
            setIsLoading(false);
        })()
    }, [needLoadUser]);

    const handleLogout = (redirectTo: string = "/",
                          notificationType: string = "success",
                          description = "You're successfully logged out.") => {
        localStorage.removeItem(ACCESS_TOKEN);
        setCurrentUser(null);
        setIsAuthenticated(false);

        props.history.push(redirectTo);

        notification[notificationType]({
            message: 'Polling App',
            description: description,
        });
    };

    const handleLogin = () => {
        notification.success({
            message: 'Polling App',
            description: "You're successfully logged in.",
        });
        setNeedLoadUser(prev => !prev);
        props.history.push("/");
    };
    if (isLoading) {
        return <LoadingIndicator/>
    }
    return (
        <Layout className="app-container">
            <AppHeader isAuthenticated={isAuthenticated}
                       currentUser={currentUser}
                       onLogout={handleLogout}/>

            <Content className="app-content">
                <div className="container">
                    <Switch>
                        <Route exact path="/">
                            <OkrView currentUser={currentUser}/>
                        </Route>
                        <Route path="/login">
                            <Login onLogin={handleLogin} />
                        </Route>
                        <Route path="/signup" component={Signup}/>
                        {/*<Route path="/users/:username"*/}
                        {/*       render={(props) => <Profile isAuthenticated={this.state.isAuthenticated}*/}
                        {/*                                   currentUser={this.state.currentUser} {...props}  />}>*/}
                        {/*</Route>*/}
                        {/*<PrivateRoute authenticated={this.state.isAuthenticated} path="/poll/new"*/}
                        {/*              component={NewPoll} handleLogout={this.handleLogout}></PrivateRoute>*/}
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </Content>
        </Layout>
    );
}

export default withRouter(App);
