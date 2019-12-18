/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
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
} from 'reactstrap';

import { getUser } from '../../services/auth';
import api from '../../services/api';

class EditUser extends Component {
  state = {
    token: '',
    user: '',
    name: '',
    email: '',
    avatar: '',
    oldPassword: '',
    password: '',
    confirmPassword: '',
  };

  async componentDidMount() {
    (() => {
      if (window.localStorage) {
        if (!localStorage.getItem('firstLoad')) {
          localStorage.firstLoad = true;
          window.location.reload();
        } else localStorage.removeItem('firstLoad');
      }
    })();

    const { location } = this.props;

    const pathArray = location.pathname.split('/');
    const id = pathArray.pop() || pathArray.pop();

    const response = await api.get('/users');

    const user = response.data.find(u => u.id === Number(id));

    this.setState({
      user,
      token: response.data.find(u => u.email === getUser()),
      avatar: user.avatar_url,
      email: user.email,
    });
  }

  handleSetEmail = e => {
    this.setState({ email: e.target.value });
  };

  handleSetPass = e => {
    this.setState({ password: e.target.value });
  };

  handleConfirmPass = e => {
    this.setState({ confirmPassword: e.target.value });

    if (e.target.value === '') {
      this.setState({ confirmPassword: null });
    }
  };

  handleSetAvatar = e => {
    this.setState({ avatar: e.target.value });
  };

  handleSubmit = async () => {
    const { user, email, avatar, password, confirmPassword } = this.state;
    const { history } = this.props;

    const avatarIsValid = avatar.match(
      /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/g
    );

    if (password && password !== confirmPassword) {
      toast.error('As senhas não conferem');
    }

    if (!email) {
      toast.warn('Informe um e-mail válido.');
    }

    if (!avatarIsValid) {
      toast.warn('Informe um avatar válido.');
    }

    if (password && email && avatarIsValid && password && confirmPassword) {
      try {
        await api.put(`/users/${user.id}`, {
          email,
          password,
          confirmPassword,
          avatar_url: avatar,
        });

        toast.success('Usuário alterado com sucesso.');
        setTimeout(() => {
          history.push(`/admin/users/list`, history.location.state);
        }, 1500);
      } catch (err) {
        toast.error(
          'Erro ao editar usuário. Verifique os dados informados e tente novamente.'
        );
      }
    }
  };

  handleShowAvatar = avatar => {
    const isValid = avatar.match(
      /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/g
    );

    return isValid && isValid;
  };

  render() {
    const { token, user, name, email, avatar } = this.state;
    const { history } = this.props;

    if (token.id === 1) {
      return (
        <>
          <ToastContainer autoClose={4500} />
          <div className="content">
            <Row>
              <Col md="9">
                <Card>
                  <CardHeader>
                    <h5 className="title">Editar Usuário</h5>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col className="pr-md-3 mb-md-4" md="12">
                          <FormGroup>
                            <label>Nome do Usuário</label>
                            <div className="pt-md-2">
                              <span>{user.name}</span>
                            </div>
                          </FormGroup>
                        </Col>
                        <Col className="pr-md-3" md="6">
                          <FormGroup>
                            <label>E-mail do Usuário</label>
                            <Input
                              defaultValue={user.email}
                              type="email"
                              onChange={this.handleSetEmail}
                            />
                          </FormGroup>
                        </Col>

                        <Col className="pl-md-3 pr-md-3" md="6">
                          <FormGroup>
                            <label>Avatar do Usuário</label>
                            <Input
                              defaultValue={avatar}
                              type="text"
                              onChange={this.handleSetAvatar}
                            />
                          </FormGroup>
                        </Col>

                        <Col md="12">
                          <hr />
                        </Col>

                        <Col className="pr-md-3" md="6">
                          <FormGroup>
                            <label>Senha</label>
                            <Input
                              placeholder="Digite a senha do novo usuário"
                              type="password"
                              onChange={this.handleSetPass}
                            />
                          </FormGroup>
                        </Col>

                        <Col className="pr-md-3" md="6">
                          <FormGroup>
                            <label>Confirme a Senha</label>
                            <Input
                              placeholder="Digite a senha do novo usuário"
                              type="password"
                              onChange={this.handleConfirmPass}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                  <CardFooter>
                    <Button
                      className="btn-info"
                      type="submit"
                      onClick={this.handleSubmit}
                    >
                      Cadastrar
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
              <Col md="3">
                <Card>
                  <CardHeader>
                    <h3 tag="h3" className="text-center">
                      {name || 'Nome do usuário'}
                    </h3>
                  </CardHeader>
                  <CardBody>
                    <Col className="pr-md-3" md="12">
                      <img
                        alt={name || 'Avatar do Usuário'}
                        src={
                          this.handleShowAvatar(avatar) ||
                          'https://placehold.it/200x170'
                        }
                        style={{ width: 200, height: 170, borderRadius: 200 }}
                      />
                    </Col>
                  </CardBody>
                  <CardFooter>
                    <h4 tag="h4" className="text-center">
                      {email || 'E-mail do Usuário'}
                    </h4>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </div>
        </>
      );
    }

    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h4 tag="h4">Erro</h4>
              </CardHeader>
              <CardBody>
                Você não tem permissão para acessar esta página.
              </CardBody>
              <CardFooter>
                <Button
                  className="btn-info"
                  onClick={() => history.push('/admin/dashboard')}
                >
                  Voltar
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default EditUser;
