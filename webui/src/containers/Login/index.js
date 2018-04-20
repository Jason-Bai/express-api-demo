import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import './login.css';
import LoginAPI from 'apis/login';
import { isAuthed, setToken, setUser } from 'utils/auth';
import { getError } from 'utils/error';

import { Form, Icon, Input, Button, Spin } from 'antd';

const FormItem = Form.Item;

const hasErrors = (fieldsError) => Object.keys(fieldsError).some(field => fieldsError[field]);

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: false,
      redirectToReferrer: false,
    };
  }
componentWillMount() {
    const authed = isAuthed();

    if (authed) {
      this.props.history.push('/');
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    this.props.form.validateFields((err, values) => {
      if (!err) {
        LoginAPI.login(values).then(({ data }) => {
          console.log(data);
          const { auth }= data;
          setToken(auth);
          setUser(data);
          setTimeout(() => {
            this.setState({
              redirectToReferrer: true,
              loading: false,
            });
          }, 100);
        }).catch((error) => {
          const { message } = getError(error);
          this.setState({
            redirectToReferrer: false,
            error: message,
            loading: false,
          });
        });
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldsError } = this.props.form;

    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />
    }

    const disabled = hasErrors(getFieldsError());

    return (
      <div className="login-form">
        <Spin spinning={this.state.loading}>
          {this.state.error && (
            <div className="error-message">{this.state.error}</div>
          )}
          <Form onSubmit={this.onSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your email!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" className="login-form-button" disabled={disabled}>Log in</Button>
            </FormItem>
          </Form>
        </Spin>
      </div>
    );
  }
}

const LoginForm = Form.create()(Login);

export default withRouter(LoginForm);
