import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { FaSpinner } from 'react-icons/fa';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Row,
  Col,
  CardTitle,
  Table,
  Button,
  UncontrolledTooltip,
} from 'reactstrap';

import api from '../../services/api';

import { Loading } from '../loading';

class Users extends Component {
  state = {
    users: '',
    loading: true,
  };

  async componentDidMount() {
    (() => {
      if (window.localStorage) {
        if (!localStorage.getItem('firstLoad')) {
          localStorage.firstLoad = true;
          window.location.reload();
        } else localStorage.removeItem('firstLoad');
      }
    })();

    const response = await api.get('/users');

    this.setState({ users: response.data, loading: false });
  }

  handleConfirmDelete = (id, name) => {
    confirmAlert({
      title: 'Confirme a exclusão.',
      message: `Você deseja excluir o usuário ${name}?`,

      buttons: [
        {
          label: 'Sim',
          onClick: () => this.handleDelete(id),
        },
        {
          label: 'Cancelar',
        },
      ],
    });
  };

  handleDelete = async id => {
    if (id !== 1) {
      try {
        await api.delete(`/users/${id}`);
        toast.success('Usuário excluído com sucesso.');

        this.loadPage();
      } catch (err) {
        toast.error('Erro ao excluir o usuário.');
      }
    } else {
      toast.error('Você não pode excluir este usuário.');
    }
  };

  loadPage = async () => {
    const response = await api.get('/users');

    this.setState({ users: response.data });
  };

  render() {
    const { history } = this.props;
    const { users, loading } = this.state;

    if (loading) {
      return (
        <Loading>
          <FaSpinner color="#000" size={48} />
        </Loading>
      );
    }

    if (history.location.state === 1) {
      return (
        <>
          <ToastContainer autoClose={4500} />
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
                    <CardTitle tag="h4">Usuários Cadastrados</CardTitle>
                    <Button
                      className="btn-fill"
                      color="primary"
                      type="submit"
                      onClick={() =>
                        history.push(
                          `/admin/users/create`,
                          history.location.state
                        )
                      }
                    >
                      Cadastrar
                    </Button>
                  </CardHeader>
                  <CardBody>
                    <Table className="tablesorter">
                      <thead className="text-primary">
                        <tr>
                          <th>Avatar</th>
                          <th>ID</th>
                          <th>Nome</th>
                          <th>E-mail</th>
                          <th className="text-center">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map(user => (
                          <tr key={user.id}>
                            <td>
                              <a
                                href={user.avatar_url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <img
                                  alt={user.name}
                                  src={user.avatar_url}
                                  style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: '50%',
                                  }}
                                />
                              </a>
                            </td>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td className="text-center">
                              <Button
                                color="link"
                                id="edit-id1"
                                title="Editar"
                                type="button"
                                onClick={() =>
                                  history.push('/admin/users/edit', 'id1')
                                }
                              >
                                <i className="tim-icons icon-pencil" />
                              </Button>
                              <UncontrolledTooltip
                                delay={0}
                                target="edit-id1"
                                placement="top"
                              >
                                Editar
                              </UncontrolledTooltip>

                              <Button
                                color="link"
                                id="remove-id1"
                                title="Remover"
                                type="top"
                                onClick={() =>
                                  this.handleConfirmDelete(user.id, user.name)
                                }
                              >
                                <i className="tim-icons icon-trash-simple" />
                              </Button>
                              <UncontrolledTooltip
                                delay={0}
                                target="remove-id1"
                              >
                                Remover
                              </UncontrolledTooltip>
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
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h4 tag="h4">Erro</h4>
              </CardHeader>
              <CardBody>
                Você não tem permissão para acessar esta página.
              </CardBody>
              <CardFooter>
                <Button
                  className="btn-info"
                  onClick={() => history.push('/admin/dashboard')}
                >
                  Voltar
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Users;
