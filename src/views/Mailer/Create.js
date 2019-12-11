/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/state-in-constructor */
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
} from 'reactstrap';
import { PropTypes } from 'prop-types';

import { ToastContainer, toast } from 'react-toastify';

import api from '../../services/api';

class CreateMailer extends Component {
  state = {
    senders: [],
    selectedSender: [],
    subject: '',
    url: '',
    recipients: '',
    hasError: false,
  };

  async componentDidMount() {
    const allSenders = await api.get(`senders`);

    this.setState({
      senders: allSenders.data,
    });
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });

    toast.error(error, info);
  }

  handleSelectSender = e => {
    const { senders } = this.state;

    const thisSender = senders.find(
      element => element.id === Number(e.target.value)
    );

    this.setState({ selectedSender: thisSender });
  };

  handleAddSubject = e => {
    this.setState({ subject: e.target.value });
  };

  handleAddUrl = e => {
    this.setState({ url: e.target.value });
  };

  handleViewMail = () => {
    const { url } = this.state;

    console.log(url);
  };

  handleAddRecipients = e => {
    this.setState({
      recipients: e.target.value,
    });
  };

  handleSubmit = () => {
    const { selectedSender, subject, url, recipients } = this.state;

    const email = {
      sender_id: selectedSender.id,
      recipients,
      subject,
      bodyurl: url,
    };

    try {
      api.post('mail', email);

      toast.success('Mensagem enviada com sucesso!');
    } catch (err) {
      toast.info('Erro ao enviar a mensagem!');
    }

    // this.handleToaster();
  };

  handleToaster = () => {};

  render() {
    const { senders, selectedSender, subject, url, hasError } = this.state;

    return (
      <>
        <ToastContainer autoClose={3000} />

        {hasError ? toast.error('Deu um erro, ein?!') : undefined}
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
                          <label>Remetente</label>

                          <Input
                            type="select"
                            name="select"
                            id="exampleSelect"
                            onChange={this.handleSelectSender}
                          >
                            <option
                              value="Selecione um remetente"
                              style={{ backgroundColor: '#d570da' }}
                            >
                              Selecione um remetente
                            </option>
                            {senders.map(sender => (
                              <option
                                key={sender.id}
                                value={sender.id}
                                style={{ backgroundColor: '#d570da' }}
                              >
                                {sender.name}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>E-mail do Remetente</label>
                          <Input
                            value={selectedSender.email}
                            placeholder="Por favor, selecione um remetente"
                            disabled
                            name="email"
                            type="text"
                          />
                        </FormGroup>
                      </Col>

                      <Col className="pr-md-1" md="8">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Assunto da Ação
                          </label>
                          <Input
                            placeholder="Digite o assunto da ação"
                            type="text"
                            value={subject}
                            onChange={this.handleAddSubject}
                          />
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

                      <Col className="pr-md-1" md="3">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            URL da Mensagem
                          </label>
                          <Input
                            placeholder="mike@email.com"
                            type="email"
                            value={url}
                            onChange={this.handleAddUrl}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="3">
                        <FormGroup>
                          <Button
                            className="btn-fill mt-md-4"
                            color="warning"
                            type="button"
                            style={{ width: '100%' }}
                            // onClick={this.handleViewMail}
                            onClick={this.notify}
                          >
                            Visualizar
                          </Button>
                        </FormGroup>
                      </Col>

                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label htmlFor="">Agendar Envio</label>
                          <Input
                            type="datetime-local"
                            disabled
                            style={{ textTransform: 'uppercase' }}
                          />
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
                            onChange={this.handleAddRecipients}
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

CreateMailer.defaultProps = {
  senders: 'Nome do Remetente',
  selectedSender: 'informes@metodista.br',
  subject: 'Assunto da Mensagem',
  url: 'http://metodista.br',
  recipients: 'informes@metodista.br',
};

CreateMailer.propTypes = {
  senders: PropTypes.string,
  selectedSender: PropTypes.string,
  subject: PropTypes.string,
  url: PropTypes.string,
  recipients: PropTypes.string,
};

export default CreateMailer;
