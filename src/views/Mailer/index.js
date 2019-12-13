import React, { Component } from 'react';
import { JsonToExcel } from 'react-json-excel';
import { FaChevronLeft, FaChevronRight, FaUser } from 'react-icons/fa';
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  CardTitle,
  Table,
} from 'reactstrap';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import api from '../../services/api';

import { PaginationButton } from './indexStyle';

class MailerList extends Component {
  state = {
    mailers: [],
    senders: [],
    users: [],
    page: 1,
  };

  async componentDidMount() {
    const response = await api.get(`/mail`, {
      params: {
        per_page: 6,
        page: 1,
      },
    });
    const responseSenders = await api.get('/senders');
    const responseUsers = await api.get('/users');

    this.setState({
      mailers: response.data,
      senders: responseSenders.data,
      users: responseUsers.data,
    });
  }

  loadPage = async () => {
    const { page } = this.state;

    const response = await api.get('/mail', {
      params: {
        per_page: 6,
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

    return (author && author.name.split(' ').slice(0, -1)) || 'Desconhecido';
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
          className="text-primary"
          text="Baixar destinatários"
        />
      </>
    );
  };

  render() {
    const { mailers, page } = this.state;

    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Ações Enviadas</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter">
                    <thead className="text-primary">
                      <tr className="text-center">
                        <th>Remetente</th>
                        <th>Destinatários</th>
                        <th>Assunto</th>
                        <th>URL</th>
                        <th>Autor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mailers.map(mailer => (
                        <tr key={mailer.id}>
                          <td>{this.useSenderName(mailer.sender_id)}</td>

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
                              className="text-primary"
                              style={{
                                backgroundColor: 'transparent',
                                border: 'none',
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
                              {mailer.bodyurl.length > 30
                                ? `...${mailer.bodyurl.substring(30, 60)} ${
                                    mailer.bodyurl.length > 60 ? '...' : ''
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
                            <FaUser size={20} className="text-primary" />
                            <ReactTooltip
                              id={`${mailer.id}-author`}
                              type="info"
                              effect="solid"
                            >
                              {this.handleGetAuthor(mailer.author_id)}
                            </ReactTooltip>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
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
                      <FaChevronLeft size={30} color="#fff" />
                    </PaginationButton>
                    <CardTitle className="pt-md-2" tag="h4">
                      Página {page}
                    </CardTitle>
                    <PaginationButton
                      type="button"
                      onClick={() => this.handlePage('next')}
                    >
                      <FaChevronRight size={30} color="#fff" />
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
