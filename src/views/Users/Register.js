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

  handleSet;

  render() {
    const { name, email, avatar, password } = this.state;

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
                      <Col className="pr-md-3" md="4">
                        <FormGroup>
                          <label>Nome do Usuário</label>
                          <Input
                            placeholder="Digite o nome do usuário"
                            type="text"
                            onChange={this.handleSetName}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-3" md="4">
                        <FormGroup>
                          <label>E-mail do Usuário</label>
                          <Input
                            placeholder="Digite o e-mail do usuário"
                            type="email"
                            onChange={this.handleSetName}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-3 pr-md-3" md="4">
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
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Confirme a Senha</label>
                          <Input
                            placeholder="Confirme a senha do novo usuário"
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
                    className="btn-fill"
                    color="primary"
                    type="submit"
                    onClick={this.handleSubmit}
                  >
                    Enviar
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
                      src={avatar || 'https://placehold.it/200x150'}
                      style={{ width: 200, height: 150, borderRadius: 4 }}
                    />
                  </Col>
                </CardBody>
                <CardFooter>
                  <h5 tag="h5" className="text-center">
                    {email || 'E-mail do Usuário'}
                  </h5>
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
