import React, { Component } from 'react';
import { JsonToExcel } from 'react-json-excel';
import { parseISO, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';
import {
  FaChevronLeft,
  FaChevronRight,
  FaUser,
  FaSpinner,
} from 'react-icons/fa';
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  CardTitle,
  Table,
  Button,
} from 'reactstrap';
import ReactTooltip from 'react-tooltip';

import api from '../../services/api';

import { PaginationButton } from '../styles/pagination';
import { Loading } from '../../components/Loading';

class MailerList extends Component {
  state = {
    mailers: [],
    senders: [],
    users: [],
    page: 1,
    loading: true,
  };

  async componentDidMount() {
    const response = await api.get(`/mail`, {
      params: {
        per_page: 10,
        page: 1,
      },
    });
    const responseSenders = await api.get('/senders');
    const responseUsers = await api.get('/users');

    this.setState({
      mailers: response.data,
      senders: responseSenders.data,
      users: responseUsers.data,
      loading: false,
    });
  }

  loadPage = async () => {
    const { page } = this.state;

    const response = await api.get('/mail', {
      params: {
        per_page: 10,
        page,
      },
    });

    this.setState({ mailers: response.data });
  };

  handlePage = async action => {
    const { page } = this.state;
    await this.setState({
      page: action === 'back' ? page - 1 : page + 1,
    });

    this.loadPage();
  };

  useSenderName = senderId => {
    const { senders } = this.state;

    const Sender = senders.find(sender => sender.id === senderId);

    return Sender && Sender.name;
  };

  handleGetAuthor = authorId => {
    const { users } = this.state;

    const author = users.find(user => user.id === authorId);

    // return (author && author.name.split(' ').slice(0, -1)) || 'Desconhecido';
    return (author && author.name) || 'Desconhecido';
  };

  mailerViewer = recipts => {
    const arrRecips = recipts.split(', ');

    const data = arrRecips.map(rec => ({ index: rec }));

    const fields = {
      index: 'Destinatários',
    };

    const style = {
      padding: '5px',
      backgroundColor: 'transparent',
      border: 'none',
      color: '#1b87f8',
      cursor: 'pointer',
    };

    return (
      <>
        <JsonToExcel
          data={data}
          filename={`destinatarios-${Math.floor(
            new Date().getTime() / 10000
          )}-${Math.floor(Math.random() * 1000)}`}
          fields={fields}
          style={style}
          text="Baixar destinatários"
        />
      </>
    );
  };

  render() {
    const { mailers, page, loading } = this.state;
    const { history } = this.props;

    if (loading) {
      return (
        <Loading>
          <FaSpinner color="#000" size={48} />
        </Loading>
      );
    }

    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <CardTitle tag="h4">Ações Enviadas</CardTitle>
                  <Button
                    className="btn-fill"
                    color="primary"
                    type="submit"
                    onClick={() => history.push(`/admin/mailer/create`)}
                  >
                    Criar Nova
                  </Button>
                </CardHeader>
                {mailers.length > 0 ? (
                  <CardBody>
                    <Table className="tablesorter">
                      <thead className="text-primary">
                        <tr className="text-center">
                          <th>Remetente</th>
                          <th>Destinatários</th>
                          <th>Assunto</th>
                          <th>URL</th>
                          <th>Autor</th>
                          <th>Envio</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mailers.map(mailer => (
                          <tr key={mailer.id}>
                            <td>
                              {mailer.sender_id
                                ? this.useSenderName(mailer.sender_id)
                                : 'Remetente desconhecido'}
                            </td>

                            <td>{this.mailerViewer(mailer.recipients)}</td>

                            <td data-tip data-for={`${mailer.id}-subject`}>
                              {mailer.subject.length > 20
                                ? `${mailer.subject.substring(0, 20)} ${
                                    mailer.subject.length > 20 ? '...' : ''
                                  }`
                                : mailer.subject}
                              <ReactTooltip
                                id={`${mailer.id}-subject`}
                                type="info"
                                effect="solid"
                              >
                                {mailer.subject}
                              </ReactTooltip>
                            </td>

                            <td data-tip data-for={`${mailer.id}-url`}>
                              <button
                                type="button"
                                style={{
                                  backgroundColor: 'transparent',
                                  border: 'none',
                                  color: '#1b87f8',
                                  cursor: 'pointer',
                                }}
                                onClick={() =>
                                  window.open(
                                    mailer.bodyurl,
                                    'NewWindow',
                                    'resizable=yes'
                                  )
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {mailer.bodyurl.length > 20
                                  ? `${mailer.bodyurl.substring(0, 20)} ${
                                      mailer.bodyurl.length > 20 ? '...' : ''
                                    }`
                                  : mailer.bodyurl}
                              </button>
                              <ReactTooltip
                                id={`${mailer.id}-url`}
                                type="info"
                                effect="solid"
                              >
                                {mailer.bodyurl}
                              </ReactTooltip>
                            </td>
                            <td
                              data-tip
                              data-for={`${mailer.id}-author`}
                              className="text-center"
                            >
                              <FaUser size={20} color="#1b87f8" />
                              <ReactTooltip
                                id={`${mailer.id}-author`}
                                type="info"
                                effect="solid"
                              >
                                {this.handleGetAuthor(mailer.author_id)}
                              </ReactTooltip>
                            </td>
                            <td>
                              {format(
                                subHours(parseISO(mailer.createdAt), 1),
                                "dd'/'MM '-' H:mm",
                                { locale: pt }
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </CardBody>
                ) : (
                  <CardBody>
                    <CardTitle tag="h1">Nenhum e-mail encontrado.</CardTitle>
                  </CardBody>
                )}
              </Card>
              <Col md="12">
                <Row>
                  <Card
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <PaginationButton
                      type="button"
                      disabled={page < 2}
                      onClick={() => this.handlePage('back')}
                    >
                      <FaChevronLeft size={30} color="#1b87f8" />
                    </PaginationButton>
                    <CardTitle className="pt-md-2" tag="h4">
                      Página {page}
                    </CardTitle>
                    <PaginationButton
                      type="button"
                      onClick={() => this.handlePage('next')}
                    >
                      <FaChevronRight size={30} color="#1b87f8" />
                    </PaginationButton>
                  </Card>
                </Row>
              </Col>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default MailerList;
