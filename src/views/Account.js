/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  CardText,
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';

import api from '../services/api';
import { getUser } from '../services/auth';

class Account extends Component {
  state = {
    users: [],
    user: '',
    oldPassword: '',
    password: '',
    confirmPassword: '',
  };

  async componentDidMount() {
    const users = await api.get(`/users`);

    this.setState({ user: users.data.find(u => u.email === getUser()) });
  }

  handleOldPassword = e => {
    const oldPassword = e.target.value;

    this.setState({ oldPassword });
  };

  handlePassword = e => {
    const password = e.target.value;

    this.setState({ password });
  };

  handleConfirmPassword = e => {
    const confirmPassword = e.target.value;

    this.setState({ confirmPassword });
  };

  handleSubmit = async () => {
    const { user, oldPassword, password, confirmPassword } = this.state;
    const { history } = this.props;

    const passwordMatch = password === confirmPassword;

    if (!passwordMatch) {
      toast.error('As senhas não conferem.');
    }

    if (!oldPassword) {
      toast.warn('Você precisa informar sua senha anterior.');
    }

    if (!password) {
      toast.warn('Você precisa informar sua nova senha.');
    }

    if (!confirmPassword) {
      toast.warn('Você precisa confirmar sua nova senha.');
    }

    if (!(password.length >= 5)) {
      toast.warn('Sua nova senha deve conter no mínimo 5 caracteres');
    }

    try {
      await api.put(`users/${user.id}`, {
        email: user.email,
        oldPassword,
        password,
        confirmPassword,
      });

      toast.success('Suas configurações foram redefinidas.');
      setTimeout(() => {
        history.push(`/admin/dashboard`);
      }, 4750);
    } catch (_) {
      toast.err(
        'Erro ao redefinir suas configurações, verifique os dados e tente novamente.'
      );
    }
  };

  render() {
    const { user } = this.state;

    return (
      <>
        <ToastContainer autoClose={4500} />
        <div className="content">
          <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h3 className="title">Configurações</h3>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pl-md-5" md="12">
                        <FormGroup>
                          <label>E-mail de Cadastro</label>
                          <div className="pt-md-2">
                            <span>{user.email}</span>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col className="pt-md-4 pl-md-4" md="12">
                        <Row>
                          <h4 className="title">Alterar senha</h4>
                        </Row>
                      </Col>
                      <Col className="pr-md-4 pl-md-4" md="12">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Senha anterior
                          </label>
                          <Input
                            placeholder="Digite sua senha anterior"
                            type="password"
                            onChange={this.handleOldPassword}
                          />
                        </FormGroup>
                      </Col>

                      <Col className="pr-md-4 pl-md-4" md="6">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">Nova senha</label>
                          <Input
                            placeholder="Digite sua nova senha"
                            type="password"
                            onChange={this.handlePassword}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-4 pl-md-4" md="6">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Confirme a nova senha
                          </label>
                          <Input
                            placeholder="Confirme sua nova senha"
                            type="password"
                            onChange={this.handleConfirmPassword}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button
                    className="btn-fill"
                    color="primary"
                    type="submit"
                    onClick={this.handleSubmit}
                  >
                    Salvar
                  </Button>
                </CardFooter>
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-user">
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt={user.name}
                        className="avatar"
                        src={user.avatar_url}
                      />
                      <h5 className="title">{user.name}</h5>
                    </a>
                    <p className="description">
                      Gerência de Comunicação e Marketing
                    </p>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Account;
