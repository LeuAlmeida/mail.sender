import React, { Component } from 'react';
import {
  FaSpinner,
  FaChevronLeft,
  FaChevronRight,
  FaDownload,
} from 'react-icons/fa';
import { parseISO, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  CardTitle,
  Table,
} from 'reactstrap';

import { Loading } from '../loading';
import { PaginationButton } from '../styles/pagination';

import api from '../../services/api';

class FilesList extends Component {
  state = {
    files: [],
    loading: true,
    page: 1,
  };

  async componentDidMount() {
    const response = await api.get(`/files`, {
      params: {
        per_page: 10,
        page: 1,
      },
    });

    this.setState({
      files: response.data,
      loading: false,
    });
  }

  loadPage = async () => {
    const { page } = this.state;

    const response = await api.get(`/files`, {
      params: {
        per_page: 10,
        page,
      },
    });

    this.setState({ files: response.data });
  };

  handlePage = async action => {
    const { page } = this.state;
    await this.setState({
      page: action === 'back' ? page - 1 : page + 1,
    });

    this.loadPage();
  };

  render() {
    const { files, page, loading } = this.state;

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
                <CardHeader>
                  <CardTitle tag="h4">Listas de Destinatários</CardTitle>
                </CardHeader>
                {files.length > 0 ? (
                  <CardBody>
                    <Table className="tablesorter">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Nome da Base</th>
                          <th>Nome do Arquivo</th>
                          <th>Data de Criação</th>
                          <th className="text-center">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {files.map(file => (
                          <tr key={file.id}>
                            <td>{file.id}</td>
                            <td>{file.declaration}</td>
                            <td>{file.name}</td>

                            <td>
                              {format(
                                subHours(parseISO(file.createdAt), 1),
                                "dd 'de' MMMM 'às' H:mm",
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
                ) : (
                  <CardBody>
                    <CardTitle tag="h1">Nenhuma base encontrada.</CardTitle>
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

export default FilesList;
