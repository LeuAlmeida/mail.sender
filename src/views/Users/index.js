import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';

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

class Users extends Component {
  state = {};

  render() {
    const { history } = this.props;

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
                {/* {senders.length > 0 ? ( */}
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
                      <tr key="">
                        <td>ID 1</td>
                        <td>Nome 1</td>
                        <td>E-mail 1</td>
                        <td className="text-center">
                          <Button
                            color="link"
                            id="edit-id1"
                            title="Editar"
                            type="button"
                            onClick={() =>
                              history.push('/admin/senders/edit', 'id1')
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
                            onClick={() => this.handleConfirmDelete()}
                          >
                            <i className="tim-icons icon-trash-simple" />
                          </Button>
                          <UncontrolledTooltip delay={0} target="remove-id1">
                            Remover
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
                {/* ) : (
                <CardBody>
                  <CardTitle tag="h1">Nenhum remetente encontrado.</CardTitle>
                </CardBody>
                )} */}
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Users;
