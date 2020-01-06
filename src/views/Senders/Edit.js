import React, { Component } from 'react';
import { FaSpinner } from 'react-icons/fa';
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

import { Loading } from '../../components/Loading';

import api from '../../services/api';

class EditSenders extends Component {
  state = {
    sender: '',
    email: '',
    name: '',
    loading: true,
  };

  async componentDidMount() {
    const { history } = this.props;
    const { state: id } = history.location;

    const response = await api.get('/senders/');

    const { data } = response;

    const sender = data.find(d => d.id === id);

    this.setState({ name: sender.name, email: sender.email });

    if (!sender) {
      toast.error('Você precisa selecionar um remetente válido');
      setTimeout(() => {
        history.push(`/admin/senders/list`);
      }, 1500);
    }

    this.setState({ sender, loading: false });
  }

  handleSetEmail = e => {
    this.setState({ email: e.target.value });
  };

  handleSetName = e => {
    this.setState({ name: e.target.value });
  };

  handleSubmit = async () => {
    const { sender, name, email } = this.state;
    const { history } = this.props;

    if (name === sender.name && email === sender.email) {
      toast.info('Nenhuma informação foi alterada.');
      setTimeout(() => {
        history.push(`/admin/senders/list`);
      }, 1500);
    } else {
      try {
        await api.put(`/senders/${sender.id}`, {
          name,
          email,
        });
        toast.success(`Remetente alterado com sucesso.`);
        setTimeout(() => {
          history.push(`/admin/senders/list`);
        }, 1500);
      } catch (err) {
        toast.error(
          'Erro ao editar este remetente. Por favor, tente novamente.'
        );
      }
    }
  };

  render() {
    const { name, email, loading } = this.state;

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
                            defaultValue={name}
                            type="text"
                            onChange={this.handleSetName}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>E-mail do Remetente</label>
                          <Input
                            defaultValue={email}
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

export default EditSenders;
