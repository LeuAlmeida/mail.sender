import React, { Component } from 'react';
import classNames from 'classnames';
import { Line } from 'react-chartjs-2';
import { FaDownload } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { parseISO, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';

import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from 'reactstrap';

import { chartExample1 } from '../variables/charts';

import api from '../services/api';

class Dashboard extends Component {
  state = {
    users: [],
    bigChartData: 'data1',
    mailers: [],
    files: [],
  };

  async componentDidMount() {
    const { history } = this.props;

    if (history.location.state === 'login') {
      toast.info('Você está conectado, seja bem-vindo!');

      history.push('/admin/dashboard', { state: null });
    }

    const mailers = await api.get('/mail');
    const users = await api.get('/users');
    const files = await api.get('/files');

    this.setState({
      mailers: mailers.data,
      files: files.data,
      users: users.data,
    });
  }

  setBgChartData = name => {
    this.setState({
      bigChartData: name,
    });
  };

  handleGetAuthor = authorId => {
    const { users } = this.state;

    const author = users.find(user => user.id === authorId);

    return (author && author.name) || 'Desconhecido';
  };

  render() {
    const { bigChartData, mailers, files } = this.state;
    return (
      <>
        <ToastContainer autoClose={2000} />
        <div className="content">
          <Row>
            <Col xs="12">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Disparo de Mensagens</h5>
                      <CardTitle tag="h2">
                        Relatório de Envios{' '}
                        <strong className="h1 btn btn-sm btn-info text-white mt-md-4">
                          EM BREVE
                        </strong>
                      </CardTitle>
                    </Col>
                    <Col sm="6">
                      <ButtonGroup
                        className="btn-group-toggle float-right"
                        data-toggle="buttons"
                      >
                        <Button
                          tag="label"
                          className={classNames('btn-simple', {
                            active: bigChartData === 'data1',
                          })}
                          color="info"
                          id="0"
                          size="sm"
                          onClick={() => this.setBgChartData('data1')}
                        >
                          <input
                            defaultChecked
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Accounts
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-single-02" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="1"
                          size="sm"
                          tag="label"
                          className={classNames('btn-simple', {
                            active: bigChartData === 'data2',
                          })}
                          onClick={() => this.setBgChartData('data2')}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Purchases
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-gift-2" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="2"
                          size="sm"
                          tag="label"
                          className={classNames('btn-simple', {
                            active: bigChartData === 'data3',
                          })}
                          onClick={() => this.setBgChartData('data3')}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Sessions
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-tap-02" />
                          </span>
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartExample1[bigChartData]}
                      options={chartExample1.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="6" md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Últimos envios</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Assunto</th>
                        <th>Mensagem</th>
                        <th>Autor</th>
                        <th>Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mailers.map(mail => (
                        <tr key={mail.id}>
                          <td>{mail.subject}</td>
                          <td>
                            <a
                              href={mail.bodyurl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Visualizar
                            </a>
                          </td>
                          <td>{this.handleGetAuthor(mail.author_id)}</td>
                          <td>
                            {format(
                              subHours(parseISO(mail.createdAt), 1),
                              "dd'/'MM",
                              { locale: pt }
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6" md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Últimas bases</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Nome</th>
                        <th>Arquivo</th>
                        <th>Data</th>
                        <th className="text-center">Download</th>
                      </tr>
                    </thead>
                    <tbody>
                      {files.map(file => (
                        <tr key={file.id}>
                          <td>{file.declaration}</td>
                          <td>{file.name}</td>
                          <td>
                            {format(
                              subHours(parseISO(file.createdAt), 1),
                              "dd'/'MM",
                              { locale: pt }
                            )}
                          </td>
                          <td className="text-center">
                            <a href={file.url}>
                              <FaDownload size={20} color="#1b87f8" />
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

export default Dashboard;
