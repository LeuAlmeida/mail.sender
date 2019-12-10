/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';

import {
  Container,
  LoginArea,
  LoginInput,
  LoginForm,
  RememberPassword,
} from './styles';

export default class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <Container>
        <LoginArea>
          <div>
            <h3>Faça o Login</h3>
          </div>

          <LoginForm>
            <LoginInput>
              <span>E-mail</span>
              <input type="email" placeholder="Digite o seu e-mail" />
            </LoginInput>
            <LoginInput>
              <span>Senha</span>
              <input type="password" placeholder="Digite sua senha" />
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
    );
  }
}
