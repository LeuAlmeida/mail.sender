import React, { Component } from 'react';
import { FaChevronLeft, FaChevronRight, FaSpinner } from 'react-icons/fa';
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  CardTitle,
  Table,
  Button,
  UncontrolledTooltip,
} from 'reactstrap';

import { Loading } from '../loading';
import { PaginationButton } from '../styles/pagination';

import api from '../../services/api';

class Senders extends Component {
  state = {
    senders: [],
    loading: true,
    page: 1,
  };

  async componentDidMount() {
    const response = await api.get(`/senders`, {
      params: {
        per_page: 6,
        page: 1,
      },
    });

    this.setState({
      senders: response.data,
      loading: false,
    });
  }

  loadPage = async () => {
    const { page } = this.state;

    const response = await api.get('/senders', {
      params: {
        per_page: 6,
        page,
      },
    });

    this.setState({ senders: response.data });
  };

  handlePage = async action => {
    const { page } = this.state;

    await this.setState({
      page: action === 'back' ? page - 1 : page + 1,
    });

    this.loadPage();
  };

  render() {
    const { senders, page, loading } = this.state;
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
                  <CardTitle tag="h4">Lista de Remetentes</CardTitle>
                  <Button
                    className="btn-fill"
                    color="primary"
                    type="submit"
                    onClick={() => history.push(`/admin/senders/create`)}
                  >
                    Cadastrar
                  </Button>
                </CardHeader>
                {senders.length > 0 ? (
                  <CardBody>
                    <Table className="tablesorter">
                      <thead className="text-primary">
                        <tr>
                          <th>ID</th>
                          <th>Nome</th>
                          <th>E-mail</th>
                          <th className="text-center">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {senders.map(sender => (
                          <tr key={sender.id}>
                            <td>{sender.id}</td>
                            <td>{sender.name}</td>
                            <td>{sender.email}</td>
                            <td className="text-center">
                              <Button
                                color="link"
                                id={`edit-${sender.id}`}
                                title="Editar"
                                type="button"
                              >
                                <i className="tim-icons icon-pencil" />
                              </Button>
                              <UncontrolledTooltip
                                delay={0}
                                target={`edit-${sender.id}`}
                                placement="top"
                              >
                                Editar
                              </UncontrolledTooltip>

                              <Button
                                color="link"
                                id={`remove-${sender.id}`}
                                title="Remover"
                                type="top"
                              >
                                <i className="tim-icons icon-trash-simple" />
                              </Button>
                              <UncontrolledTooltip
                                delay={0}
                                target={`remove-${sender.id}`}
                                placement="left"
                              >
                                Remover
                              </UncontrolledTooltip>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </CardBody>
                ) : (
                  <CardBody>
                    <CardTitle tag="h1">Nenhum remetente encontrado.</CardTitle>
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

export default Senders;
