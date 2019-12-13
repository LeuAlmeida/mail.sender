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
  CustomInput,
} from 'reactstrap';
import { PropTypes } from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';

import '../../assets/css/black-dashboard-react.css';

import api from '../../services/api';
import { getUser } from '../../services/auth';

class CreateMailer extends Component {
  state = {
    user: '',
    senders: [],
    selectedSender: [],
    subject: '',
    url: '',
    recipients: '',
    checked: false,
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

    const users = await api.get(`/users`);

    this.setState({ user: users.data.find(u => u.email === getUser()) });
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
    const { selectedSender, subject, url, recipients, user } = this.state;
    const { history } = this.props;
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
      author_id: user.id,
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
        history.push(`/admin/mailer/list`);
      }, 1500);
    }
  };

  handleRecipientsExtract = () => {
    toast.info('Ops! Essa função ainda está em desenvolvimento.');

    this.setState({ checked: false });

    /**
     * Ao retomar o desenvolvimento desta função,
     * descomentar abaixo e comentar o que está acima.
     */

    // const { checked } = this.state;
    // this.setState({ checked: !checked });
  };

  handleSelectFile = () => {
    toast.error(
      'Essa função ainda está em desenvolvimento, você não deveria estar aqui.'
    );
  };

  render() {
    const { senders, selectedSender, subject, url, user, checked } = this.state;

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
                            <span>{user.name}</span>
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

                      {checked ? (
                        <Col className="py-md-1" md="8">
                          <FormGroup>
                            <Label for="importRecipients">
                              Extrair destinatários
                            </Label>
                            <CustomInput
                              onClick={this.handleSelectFile}
                              type="file"
                              id="importRecipients"
                              name="customFile"
                              className="text-primary"
                            />
                          </FormGroup>
                        </Col>
                      ) : (
                        <Col className="py-md-1" md="8">
                          <FormGroup>
                            <label htmlFor="exampleInputEmail1">
                              Destinatários
                            </label>
                            <Input
                              placeholder="Cole os destinatários aqui."
                              type="textarea"
                              onChange={this.handleAddRecipients}
                              value={checked ? 'Nada' : undefined}
                            />
                          </FormGroup>
                        </Col>
                      )}

                      <Col className="pt-md-4" md="4">
                        <div className="table-full-width table-responsive">
                          <Table>
                            <tbody>
                              <tr>
                                <td>
                                  <FormGroup check>
                                    <Label check>
                                      <Input
                                        defaultValue=""
                                        type="checkbox"
                                        checked={checked}
                                        onChange={this.handleRecipientsExtract}
                                      />
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
  history: {},
};

CreateMailer.propTypes = {
  senders: PropTypes.string,
  selectedSender: PropTypes.string,
  subject: PropTypes.string,
  url: PropTypes.string,
  recipients: PropTypes.string,
  history: PropTypes.object,
};

export default CreateMailer;
