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
} from 'reactstrap';

import api from '../../services/api';

class CreateMailer extends Component {
  state = {
    senders: [],
    selectedSender: [],
  };

  async componentDidMount() {
    const allSenders = await api.get(`senders`);

    this.setState({
      senders: allSenders.data,
    });
  }

  selectSender = e => {
    this.setState({ selectedSender: e.target.value });
  };

  render() {
    const { senders } = this.state;

    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h5 className="title">Criar Ação</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>E-mail do Remetente</label>
                          <Input disabled type="text" />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Remetente</label>

                          <Input
                            type="select"
                            name="select"
                            id="exampleSelect"
                            onChange={this.selectSender}
                          >
                            {senders.map(sender => (
                              <option
                                key={sender.id}
                                style={{ backgroundColor: '#d570da' }}
                              >
                                {sender.name}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>

                      <Col className="pr-md-1" md="8">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Assunto da Ação
                          </label>
                          <Input placeholder="..." type="email" />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="4">
                        <FormGroup>
                          <label htmlFor="">Autor do Disparo</label>
                          <Input
                            type="text"
                            defaultValue="Léu Almeida"
                            disabled
                          />
                        </FormGroup>
                      </Col>

                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label htmlFor="">Agendar Envio</label>
                          <Input
                            type="datetime-local"
                            disabled
                            style={{ textTransform: 'uppercase' }}
                          />
                        </FormGroup>
                      </Col>

                      <Col className="pl-md-1" md="3">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            URL da Mensagem
                          </label>
                          <Input placeholder="mike@email.com" type="email" />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="3">
                        <FormGroup>
                          <Button
                            className="btn-fill mt-md-4"
                            color="warning"
                            type="button"
                            style={{ width: '100%' }}
                          >
                            Visualizar
                          </Button>
                        </FormGroup>
                      </Col>
                      <Col className="py-md-1" md="12">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Destinatários
                          </label>
                          <Input
                            placeholder="leonardo.almeida@metodista.br"
                            type="textarea"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" type="submit">
                    Save
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

export default CreateMailer;
