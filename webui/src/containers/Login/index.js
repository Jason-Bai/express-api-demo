import React from 'react';
import { withRouter } from 'react-router-dom';
import './login.css';
import LoginAPI from '../../api/login';
import { isTokenValid, isUserValid, setToken, setUser } from '../../utils/auth';

import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  componentWillMount() {
    const tokenValid = isTokenValid();

    const userValid = isUserValid();

    if (tokenValid && userValid) {
      this.props.history.push('/app');
      return;
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        LoginAPI.login(values).then(({ data }) => {
          const { auth }= data;
          setToken(auth);
          setUser(data);
          setTimeout(() => {
            this.props.history.push('/app');
          }, 100);
        }).catch((error) => {
          this.setState({
            error,
          });
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="login-form">
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
            <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const LoginForm = Form.create()(Login);

export default withRouter(LoginForm);
