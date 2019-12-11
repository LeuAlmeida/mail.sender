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
  Button,
  UncontrolledTooltip,
} from 'reactstrap';

import api from '../services/api';

class Senders extends Component {
  state = {
    senders: [],
  };

  async componentDidMount() {
    const response = await api.get(`/senders`);

    this.setState({
      senders: response.data,
    });

    console.log(this.state.senders);
  }

  render() {
    const { senders } = this.state;

    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Lista de Remetentes</CardTitle>
                </CardHeader>
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
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Senders;
