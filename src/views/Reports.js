import React, { Component } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import { format, parseISO, getMonth } from 'date-fns';
import pt from 'date-fns/esm/locale/pt';
import { Col, Row, Card, CardHeader, CardBody, Table } from 'reactstrap';

import { Loading } from './loading';

import api from '../services/api';

class Reports extends Component {
  state = {
    monthlyMails: '',
    monthlySended: '',
    monthlyRecipients: '',
    monthlyMoney: '',
    loading: true,
  };

  async componentDidMount() {
    const month = getMonth(new Date());

    const monthlyMails = await api.get(`/reports/${month}`);

    const totalRecipients = monthlyMails.data
      .map(mails => mails.recipients)
      .join(',')
      .split(',');

    this.setState({
      monthlyMails: monthlyMails.data,
      monthlySended: monthlyMails.data.length,
      monthlyRecipients: totalRecipients.length,
      loading: false,
    });
  }

  render() {
    const {
      monthlyMails,
      monthlySended,
      monthlyRecipients,
      loading,
    } = this.state;

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
                <CardBody>
                  <CardHeader>
                    <h3
                      tag="h3"
                      className="ml-md-2"
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span>Análise Mensal</span>
                      <span
                        className="btn btn-lg btn-info"
                        style={{ textTransform: 'capitalize' }}
                      >
                        {format(getMonth(new Date()), 'MMMM', { locale: pt })}
                      </span>
                    </h3>
                  </CardHeader>
                  <Table className="tablesorter">
                    <thead className="text-primary">
                      <tr>
                        <th className="text-center">Mensagens Enviadas</th>
                        <th className="text-center">Total de Destinatários</th>
                        <th className="text-center">Dinheiro Economizado</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-center">
                          {monthlySended}{' '}
                          {monthlySended === 1 ? 'Ação' : 'Ações'}
                        </td>
                        <td className="text-center">
                          {monthlyRecipients}{' '}
                          {monthlyRecipients === 1
                            ? 'Destinatário'
                            : 'Destinatários'}
                        </td>
                        <td className="text-center">
                          R$ <strong>{monthlyRecipients * 0.06}</strong>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h3 tag="h3" className="ml-md-2">
                    Relatório de Envios
                  </h3>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter">
                    <thead className="text-primary">
                      <tr>
                        <th>Assunto</th>
                        <th className="text-center">Destinatários</th>
                        <th className="text-center">Data</th>
                        <th className="text-center">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {monthlyMails.map(m => (
                        <tr key={m.id}>
                          <td>{m.subject}</td>
                          <td className="text-center">
                            {`${
                              JSON.stringify(m.recipients).split(',').length
                            } ${
                              JSON.stringify(m.recipients).split(',').length ===
                              1
                                ? 'Destinatário'
                                : 'Destinatários'
                            }`}
                          </td>
                          <td className="text-center">
                            {format(parseISO(m.createdAt), "dd'/'MM'/'yyyy")}
                          </td>
                          <td className="text-center">A</td>
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

export default Reports;
