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

class EditSenders extends Component {
  state = {
    sender: '',
    email: '',
    name: '',
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

    const { history } = this.props;
    const { state: id } = history.location;

    const response = await api.get('/senders/');

    const { data } = response;

    const sender = data.find(d => d.id === id);

    this.setState({ sender });
  }

  handleSetEmail = e => {
    this.setState({ email: e.target.value });
  };

  handleSetName = e => {
    this.setState({ name: e.target.value });
  };

  handleSubmit = async () => {
    const { sender, name, email } = this.state;

    try {
      await api.put(`/senders/${sender.id}`, {
        name,
        email,
      });
      toast.success('Sucesso!');
    } catch (err) {
      toast.error('Erro!');
    }
  };

  render() {
    const { sender } = this.state;

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
                            defaultValue={sender.name}
                            type="text"
                            onChange={this.handleSetName}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>E-mail do Remetente</label>
                          <Input
                            defaultValue={sender.email}
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
