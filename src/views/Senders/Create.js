import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
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

class SendersCreate extends Component {
  state = {
    name: '',
    email: '',
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

  handleSetEmail = e => {
    this.setState({ email: e.target.value });
  };

  handleSetName = e => {
    this.setState({ name: e.target.value });
  };

  handleSubmit = async () => {
    const { name, email } = this.state;
    const { history } = this.props;

    if (!name) {
      toast.warn('Você precisa informar o nome do remetente.');
    }

    if (!email) {
      toast.warn('Você precisa informar o e-mail do remetente.');
    }

    const response = {
      name,
      email,
    };

    if (name && email) {
      try {
        await api.post('/senders', response);
        toast.success('Remetente cadastrado com sucesso.');
        setTimeout(() => {
          history.push(`/admin/senders/list`);
        }, 1500);
      } catch (err) {
        toast.error('Erro ao cadastrar remetente.');
      }
    }
  };

  render() {
    return (
      <>
        <ToastContainer autoClose={4500} />
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h5 className="title">Cadastrar Remetente</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Nome do Remetente</label>
                          <Input
                            placeholder="Digite o nome do remetente"
                            type="text"
                            onChange={this.handleSetName}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>E-mail do Remetente</label>
                          <Input
                            placeholder="Digite o e-mail do remetente"
                            type="text"
                            onChange={this.handleSetEmail}
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
          </Row>
        </div>
      </>
    );
  }
}

export default SendersCreate;
