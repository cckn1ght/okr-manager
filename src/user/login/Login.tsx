import React from 'react';
import './login.css';
import {Link} from 'react-router-dom';
import {ACCESS_TOKEN} from '../../constants';

import {Form, Input, Button, Icon, notification} from 'antd';
import {FormComponentProps} from 'antd/es/form';
import {login} from "../../util/UserApi";
import {LoginRequest} from "../../constants/payload";

const FormItem = Form.Item;

interface LoginProps extends FormComponentProps {
    onLogin: () => void;
}

const createReq = (values: any) => {
    const req: LoginRequest = {
        email: values["username"],
        password: values["password"]
    };
    return req;
};

const Login = (props: LoginProps) => {
    const {getFieldDecorator} = props.form;
    const handleSubmit = (event: any) => {
        event.preventDefault();
        props.form.validateFields(async (err, values) => {
            if (!err) {
                const loginRequest = createReq(values);
                try {
                    const response = await login(loginRequest);
                    localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                    props.onLogin();
                } catch (error) {
                    if (error.status === 401) {
                        notification.error({
                            message: 'OKR Manager',
                            description: 'Your Username or Password is incorrect. Please try again!'
                        });
                    } else {
                        notification.error({
                            message: 'OKR Manager',
                            description: error.message || 'Sorry! Something went wrong. Please try again!'
                        });
                    }
                }
            }
        });
    };
    return (
        <div className="login-container">
            <h1 className="page-title">Login</h1>
            <div className="login-content">
                <Form onSubmit={handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('username', {
                            rules: [{required: true, message: 'Please input your email!'}],
                        })(
                            <Input
                                prefix={<Icon type="user"/>}
                                size="large"
                                name="email"
                                placeholder="Email"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: 'Please input your Password!'}],
                        })(
                            <Input
                                prefix={<Icon type="lock"/>}
                                size="large"
                                name="password"
                                type="password"
                                placeholder="Password"/>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" size="large"
                                className="login-form-button">Login</Button>
                        Or <Link to="/signup">register now!</Link>
                    </FormItem>
                </Form>
            </div>
        </div>
    );
};


export default Form.create<LoginProps>()(Login);