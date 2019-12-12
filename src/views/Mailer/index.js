import React, { Component } from 'react';

// reactstrap components
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

class MailerList extends Component {
  state = {
    mailers: [],
    senders: [],
  };

  async componentDidMount() {
    const response = await api.get(`/mail`);

    this.setState({
      mailers: response.data,
    });

    const responseSenders = await api.get('/senders');

    this.setState({
      senders: responseSenders.data,
    });
  }

  render() {
    const { mailers } = this.state;

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
                            <a
                              href={mailer.bodyurl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {mailer.bodyurl.length > 30
                                ? `...${mailer.bodyurl.substring(30, 60)} ${
                                    mailer.bodyurl.length > 60 ? '...' : ''
                                  }`
                                : mailer.bodyurl}
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default MailerList;
