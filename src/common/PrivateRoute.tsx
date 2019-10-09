import React from 'react';
import {
    Route,
    Redirect, RouteProps
} from "react-router-dom";

interface PrivateRouteProps extends RouteProps {
    authenticated: boolean;
}

export class PrivateRoute extends Route<PrivateRouteProps> {
    public render() {
        const {authenticated, ...rest} = this.props;
        return (
            <Route
                {...rest}
            >
                {!authenticated ?
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: this.props.location }
                        }}
                    /> :
                    this.props.children
                }
            </Route>
        )
    }
}
