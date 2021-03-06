/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {
  Container,
  LoginArea,
  LoginInput,
  LoginForm,
  RememberPassword,
} from './styles';

import api from '../../services/api';
import { login, setUser } from '../../services/auth';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: undefined,
      password: undefined,
    };
  }

  componentDidMount() {
    const { history } = this.props;

    if (history.location.state === 'logout') {
      toast.info('Você foi desconectado.');

      history.push('/login', '');
    }
  }

  handleSignIn = async e => {
    e.preventDefault();

    const { email, password } = this.state;

    if (!email || !password || email === null || password === null) {
      toast.error('Preencha e-mail e senha para continuar!');
    } else {
      try {
        const response = await api.post('/login', { email, password });
        login(response.data.token);

        setUser(email);

        const { history } = this.props;

        history.push('/admin/dashboard', 'login');
      } catch (err) {
        toast.error('E-mail e/ou senha incorretos.');
      }
    }
  };

  render() {
    return (
      <>
        <ToastContainer autoClose={2000} />
        <Container>
          <LoginArea>
            <div>
              <h3>Faça o Login</h3>
            </div>

            <LoginForm onSubmit={this.handleSignIn}>
              <LoginInput>
                <span>E-mail</span>
                <input
                  type="email"
                  placeholder="Digite o seu e-mail"
                  onChange={e => this.setState({ email: e.target.value })}
                />
              </LoginInput>
              <LoginInput>
                <span>Senha</span>
                <input
                  type="password"
                  placeholder="Digite sua senha"
                  onChange={e => this.setState({ password: e.target.value })}
                />
              </LoginInput>
              <RememberPassword>
                <label>
                  <input type="checkbox" />
                  <strong>Lembrar minha senha</strong>
                </label>
              </RememberPassword>
              <button type="submit" onClick={this.handleSubmit}>
                Entrar
              </button>
            </LoginForm>
          </LoginArea>
        </Container>
      </>
    );
  }
}

export default withRouter(Login);
