import React from 'react';
import './Signup.css';
import {Link, RouteComponentProps} from 'react-router-dom';

import {Form, Input, Button, notification} from 'antd';
import {SignUpRequest} from "../../constants/payload";
import {signup} from "../../util/UserApi";
import {FormComponentProps} from "antd/es/form";
import {APP_NAME} from "../../constants";

const FormItem = Form.Item;

const createReq = (values: any) => {
    const signupRequest: SignUpRequest = {
        name: values["name"],
        email: values["username"],
        password: values["password"]
    };
    return signupRequest;
};
const Signup = (props: FormComponentProps & RouteComponentProps) => {

    const handleSubmit = (event: any) => {
        event.preventDefault();
        props.form.validateFields(async (err, values) => {
            if (!err) {
                try {
                    const signupRequest = createReq(values);
                    const res = await signup(signupRequest);
                    if (res.success) {
                        notification.success({
                            message: APP_NAME,
                            description: "Thank you! You're successfully registered. Please Login to continue!",
                        });
                        props.history.push("/login");
                    } else {
                        notification.error({
                            message: APP_NAME,
                            description: res.message || 'Sorry! Something went wrong. Please try again!'
                        });
                    }
                } catch (error) {
                    notification.error({
                        message: APP_NAME,
                        description: error.message || 'Sorry! Something went wrong. Please try again!'
                    });
                }
            }
        })
    };

    const {getFieldDecorator} = props.form;
    return (
        <div className="signup-container">
            <h1 className="page-title">Sign Up</h1>
            <div className="signup-content">
                <Form onSubmit={e => handleSubmit(e)} className="signup-form">
                    <FormItem label="Full Name">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please input your name!' }],
                        })(
                            <Input
                                size="large"
                                name="name"
                                autoComplete="off"
                                placeholder="Your full name"
                            />,
                        )}
                    </FormItem>
                    <FormItem label="Email" hasFeedback>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your email!' }],
                        })(
                            <Input
                                size="large"
                                name="email"
                                type="email"
                                autoComplete="off"
                                placeholder="Your email" />
                        )}
                    </FormItem>
                    <FormItem label="Password">
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your password!' }],
                        })(
                            <Input
                                size="large"
                                name="password"
                                type="password"
                                autoComplete="off"
                                placeholder="A password"
                                />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary"
                                htmlType="submit"
                                size="large"
                                className="signup-form-button">Sign up</Button>
                        Already registered? <Link to="/login">Login now!</Link>
                    </FormItem>
                </Form>
            </div>
        </div>
    );

};

export default Form.create<FormComponentProps & RouteComponentProps>()(Signup);
