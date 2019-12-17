import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { FaSpinner } from 'react-icons/fa';
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

import { Loading } from '../loading';

import api from '../../services/api';

class SendersCreate extends Component {
  state = {
    name: '',
    email: '',
    loading: true,
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

    this.setState({ loading: false });
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
    const { loading } = this.state;

    if (loading) {
      return (
        <Loading>
          <FaSpinner color="#000" size={48} />
        </Loading>
      );
    }

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
