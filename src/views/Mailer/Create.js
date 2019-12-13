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
  Label,
  Table,
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
    uploadRecipients: false,
  };

  async componentDidMount() {
    const allSenders = await api.get(`senders`);

    this.setState({
      senders: allSenders.data,
    });

    (() => {
      if (window.localStorage) {
        if (!localStorage.getItem('firstLoad')) {
          localStorage.firstLoad = true;
          window.location.reload();
        } else localStorage.removeItem('firstLoad');
      }
    })();
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

    const urlIsValid = url.match(
      /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/g
    );

    if (urlIsValid) {
      window.open(url, 'NewWindow', 'resizable=yes');
    } else {
      toast.warning('Por favor, digite um endereço válido.');
    }
  };

  handleAddRecipients = e => {
    const allRecipients = e.target.value;

    const recipients = allRecipients.replace(/\n/g, ', ');

    this.setState({
      recipients,
    });
  };

  handleSubmit = () => {
    const { selectedSender, subject, url, recipients } = this.state;
    const domain = 'metodista.br';

    // Sender Validators
    const selectedSenderIsValid = selectedSender.length === undefined;

    if (!selectedSenderIsValid) {
      toast.warning('Por favor, selecione um remetente.');
    }

    // Subject Validators

    const subjectIsValid = subject.length > 16;

    if (!subjectIsValid) {
      toast.warning('O assunto precisa ter mais de 16 caracteres.');
    }

    // Url Validators
    const urlIsValid = url.match(
      /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/g
    );

    if (!urlIsValid) {
      toast.warning('Por favor, digite um endereço válido.');
    }

    // Recipients Validators
    if (!recipients) {
      toast.warning('Informe ao menos 1 destinatário.');
    }
    const recipientsArray = recipients.split(',');

    const recipientsDomain = recipientsArray.map(rec => rec.replace(/.*@/, ''));

    const notValidDomain = recipientsDomain.find(recips => recips !== domain);

    if (recipients && notValidDomain) {
      toast.warning(`Todos os domínios necessitam terminar com ${domain}`);
    }

    const recipientsIsValid = recipientsArray.length < 500;

    if (!recipientsIsValid) {
      toast.warning('O limite de destinatários é de 500 e-mails.');
    }

    const email = {
      sender_id: selectedSender.id,
      recipients,
      subject,
      bodyurl: url,
    };

    if (
      selectedSenderIsValid &&
      subjectIsValid &&
      urlIsValid &&
      recipientsIsValid &&
      !notValidDomain
    ) {
      api.post('mail', email);
      toast.success('Mensagem enviada com sucesso!');

      setTimeout(() => {
        this.props.history.push(`/admin/mailer/list`);
      }, 1500);
    }
  };

  render() {
    const { senders, selectedSender, subject, url } = this.state;

    return (
      <>
        <ToastContainer autoClose={4500} />
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
                      <Col className="pr-md-1" md="8">
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
                              style={{ backgroundColor: '#fff', color: '#000' }}
                            >
                              Selecione um remetente
                            </option>
                            {senders.map(sender => (
                              <option
                                key={sender.id}
                                value={sender.id}
                                style={{
                                  backgroundColor: '#fff',
                                  color: '#000',
                                }}
                              >
                                {sender.name}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-2" md="4">
                        <FormGroup>
                          <label>E-mail do remetente</label>
                          <div className="pt-md-2 pl-md-2">
                            <span>
                              {selectedSender
                                ? selectedSender.email
                                : 'Por favor, selecione um remetente'}
                            </span>
                          </div>
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

                      <Col className="pl-md-2" md="4">
                        <FormGroup>
                          <label>Autor deste envio</label>
                          <div className="pt-md-2 pl-md-2">
                            <span>Léu Almeida</span>
                          </div>
                        </FormGroup>
                      </Col>

                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            URL da Mensagem
                          </label>
                          <Input
                            placeholder="Digite o endereço da mensagem"
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
                            onClick={this.handleViewMail}
                          >
                            Visualizar
                          </Button>
                        </FormGroup>
                      </Col>

                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label htmlFor="">Agendar Envio</label>
                          <Input
                            type="datetime-local"
                            disabled
                            style={{ textTransform: 'uppercase' }}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="py-md-1" md="8">
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

                      <Col className="pt-md-4" md="4">
                        <div className="table-full-width table-responsive">
                          <Table>
                            <tbody>
                              <tr>
                                <td>
                                  <FormGroup check>
                                    <Label check>
                                      <Input defaultValue="" type="checkbox" />
                                      <span className="form-check-sign">
                                        <span className="check" />
                                      </span>
                                    </Label>
                                  </FormGroup>
                                </td>
                                <td>
                                  <p className="title">Extrair destinatários</p>
                                  <p className="text-muted">
                                    Deseja enviar para uma base específica?
                                  </p>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
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
