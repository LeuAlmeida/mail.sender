import React, { Component } from 'react';
import { format, parseISO, getMonth } from 'date-fns';
import pt from 'date-fns/esm/locale/pt';
import {
  Col,
  Row,
  Card,
  CardTitle,
  CardHeader,
  CardBody,
  Table,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { FaChevronLeft, FaChevronRight, FaSpinner } from 'react-icons/fa';
import { PaginationButton } from './styles/pagination';
import { Loading } from '../components/Loading';

import api from '../services/api';

class Reports extends Component {
  state = {
    mails: '',
    totalMails: '',
    senders: '',
    interval: 15,
    monthlySended: '',
    monthlyRecipients: '',
    monthlyMoney: '',
    totalSended: '',
    page: 1,
    loading: true,
  };

  async componentDidMount() {
    const month = getMonth(new Date());

    const responseSenders = await api.get('/senders');
    const monthlyMails = await api.get(`/reports/filter/${month}`);
    const totalMails = await api.get('/reports/total');
    const mails = await api.get(`/reports/interval/15`);

    const monthlyTotalRecipients = monthlyMails.data
      .map(monthlyMail => monthlyMail.recipients)
      .join(',')
      .split(',');

    const totalRecipients = monthlyMails.data
      .map(monthlyMail => monthlyMail.recipients)
      .join(',')
      .split(',');

    this.setState({
      monthlySended: monthlyMails.data.length,
      monthlyRecipients: monthlyTotalRecipients.length,
      mails: mails.data,
      senders: responseSenders.data,
      totalMails: totalMails.data,
      totalSended: totalMails.data.length,
      totalRecipients: totalRecipients.length,
      loading: false,
    });
  }

  loadPage = async () => {
    const { interval, page } = this.state;

    const mails = await api.get(`/reports/interval/${interval}`);

    this.setState({ mails: mails.data });
  };

  useSenderName = senderId => {
    const { senders } = this.state;

    const Sender = senders.find(sender => sender.id === senderId);

    return Sender && Sender.name;
  };

  handleChangePeriod = async e => {
    this.setState({ interval: e.target.value });

    const { interval } = this.state;

    const mails = await api.get(`/reports/interval/${interval}`);

    this.setState({ mails: mails.data, page: 1 });

    this.loadPage();
  };

  loadPagination = async () => {
    const { interval, page } = this.state;

    const response = await api.get(`/reports/interval/${interval}`, {
      params: {
        per_page: 6,
        page,
      },
    });

    this.setState({ mails: response.data });
  };

  handlePage = async action => {
    const { page } = this.state;

    await this.setState({
      page: action === 'back' ? page - 1 : page + 1,
    });

    this.loadPagination();
  };

  render() {
    const {
      mails,
      monthlySended,
      monthlyRecipients,
      totalSended,
      totalRecipients,
      loading,
      interval,
      page,
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
                        <th className="text-center">
                          Mensagens Enviadas no Mês
                        </th>
                        <th className="text-center">Total de Destinatários</th>
                        <th className="text-center">
                          Dinheiro Economizado no Mês
                        </th>
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
                  <Table className="tablesorter">
                    <thead className="text-primary">
                      <tr>
                        <th className="text-center">
                          Total de Mensagens Enviadas
                        </th>
                        <th className="text-center">Total de Destinatários</th>
                        <th className="text-center">
                          Dinheiro Economizado no Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-center">
                          {totalSended} {monthlySended === 1 ? 'Ação' : 'Ações'}
                        </td>
                        <td className="text-center">
                          {totalRecipients}{' '}
                          {totalRecipients === 1
                            ? 'Destinatário'
                            : 'Destinatários'}
                        </td>
                        <td className="text-center">
                          R$ <strong>{totalRecipients * 0.06}</strong>
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
                  <Row
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Col md="6">
                      <span className="h3 ml-md-2">Relatório de Envios</span>
                    </Col>
                    <FormGroup>
                      <Col md="12">
                        <Label for="exampleSelect">Período</Label>
                        <Input
                          type="select"
                          name="select"
                          id="exampleSelect"
                          value={interval}
                          onChange={this.handleChangePeriod}
                          style={{
                            width: 200,
                          }}
                        >
                          <option value="15">Últimos 15 dias</option>
                          <option value="30">Últimos 30 dias</option>
                          <option value="90">Últimos 90 dias</option>
                          <option value="3650">Todo o período</option>
                        </Input>
                      </Col>
                    </FormGroup>
                  </Row>
                </CardHeader>
                {mails.length !== 0 ? (
                  <CardBody>
                    <Table className="tablesorter">
                      <thead className="text-primary">
                        <tr>
                          <th className="text-center">Remetente</th>
                          <th className="text-center">Assunto</th>
                          <th className="text-center">Destinatários</th>
                          <th className="text-center">Economia</th>
                          <th className="text-center">Data</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mails.map(m => (
                          <tr key={m.id}>
                            <td className="text-center">
                              {m.sender_id
                                ? this.useSenderName(m.sender_id)
                                : 'Remetente desconhecido'}
                            </td>
                            <td className="text-center">{m.subject}</td>
                            <td className="text-center">
                              {`${
                                JSON.stringify(m.recipients).split(',').length
                              }`}
                            </td>
                            <td className="text-center">
                              R${' '}
                              {JSON.stringify(m.recipients).split(',').length *
                                0.06}
                            </td>
                            <td className="text-center">
                              {format(
                                parseISO(m.createdAt),
                                "dd'/'MM'/'yyyy 'às' H:mm"
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </CardBody>
                ) : (
                  <CardBody className="text-center">
                    <CardTitle tag="h4">Nenhuma ação encontrada.</CardTitle>
                  </CardBody>
                )}
              </Card>
            </Col>
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
          </Row>
        </div>
      </>
    );
  }
}

export default Reports;
