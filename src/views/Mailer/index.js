import React, { Component } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  CardTitle,
  Table,
} from 'reactstrap';

import api from '../../services/api';

import { PaginationButton } from './indexStyle';

class MailerList extends Component {
  state = {
    mailers: [],
    senders: [],
    page: 1,
  };

  async componentDidMount() {
    const response = await api.get(`/mail`, {
      params: {
        per_page: 6,
        page: 1,
      },
    });

    this.setState({
      mailers: response.data,
    });

    const responseSenders = await api.get('/senders');

    this.setState({
      senders: responseSenders.data,
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

  useSenderName(senderId) {
    const { senders } = this.state;

    const Sender = senders.find(sender => sender.id === senderId);

    // const SenderMap = Sender.map(s => console.log(s));

    console.log(Sender.id);
  }

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
                      <tr>
                        <th>Remetente</th>
                        <th>Destinatários</th>
                        <th>Assunto</th>
                        <th>URL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mailers.map(mailer => (
                        <tr key={mailer.id}>
                          <td className="text-center">{mailer.sender_id}</td>
                          <td>
                            Visualizar destinatários {/* mailer.recipients */}
                          </td>
                          <td>{mailer.subject}</td>
                          <td>
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
