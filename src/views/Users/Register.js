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

import api from '../../services/api';

class Register extends Component {
  state = {
    name: '',
    email: '',
    avatar: '',
    password: '',
  };

  componentDidMount() {
    (() => {
      if (window.localStorage) {
        if (!localStorage.getItem('firstLoad')) {
          localStorage.firstLoad = true;
          window.location.reload();
        } else localStorage.removeItem('firstLoad');
      }
    })();
  }

  handleSetName = e => {
    this.setState({ name: e.target.value });
  };

  handleSetEmail = e => {
    this.setState({ email: e.target.value });
  };

  handleSetPass = e => {
    this.setState({ password: e.target.value });
  };

  handleSetAvatar = e => {
    this.setState({ avatar: e.target.value });
  };

  handleSubmit = async () => {
    const { name, email, avatar, password } = this.state;
    const { history } = this.props;

    const urlIsValid = avatar.match(
      /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/g
    );

    if (!name) {
      toast.warn('Por favor, informe um nome.');
    }

    if (!email) {
      toast.warn('Por favor, informe um e-mail.');
    }

    if (!password) {
      toast.warn('Por favor, informe uma senha.');
    }

    if (!urlIsValid) {
      toast.warn('Por favor, informe um avatar válido.');
    }

    if (name && email && password && urlIsValid) {
      try {
        await api.post('/users/', {
          name,
          email,
          password,
          avatar_url: avatar,
        });

        toast.success('Usuário cadastrado com sucesso.');
        setTimeout(() => {
          history.push(`/admin/users/list`, history.location.state);
        }, 1500);
      } catch (err) {
        toast.error(
          'Erro ao cadastrar usuário. Verifique os dados informados e tente novamente.'
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
    const { name, email, avatar } = this.state;
    const { history } = this.props;

    return (
      <>
        <ToastContainer autoClose={4500} />
        <div className="content">
          <Row>
            <Col md="9">
              <Card>
                <CardHeader>
                  <h5 className="title">Cadastrar Usuário</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-3" md="6">
                        <FormGroup>
                          <label>Nome do Usuário</label>
                          <Input
                            placeholder="Digite o nome do usuário"
                            type="text"
                            onChange={this.handleSetName}
                          />
                        </FormGroup>
                      </Col>

                      <Col className="pl-md-3 pr-md-3" md="6">
                        <FormGroup>
                          <label>Avatar do Usuário</label>
                          <Input
                            placeholder="Digite a URL do avatar"
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
                          <label>E-mail do Usuário</label>
                          <Input
                            placeholder="Digite o e-mail do usuário"
                            type="email"
                            onChange={this.handleSetEmail}
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
                        'https://placehold.it/200x150'
                      }
                      style={{ width: 200, height: 150, borderRadius: 4 }}
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
}

export default Register;
