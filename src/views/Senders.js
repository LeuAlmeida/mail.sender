
import React, { Component } from "react";

import { FaEdit, FaTrash } from 'react-icons/fa'

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col, CardTitle, Table } from "reactstrap";

import api from '../services/api';

class Senders extends Component {

  state = {
    senders: []
  }

  async componentDidMount() {
    const response = await api.get(`/senders`);

    this.setState({
      senders: response.data
    });

    console.log(this.state.senders)
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
                        <tr>
                        <td>{sender.id}</td>
                        <td>{sender.name}</td>
                        <td>{sender.email}</td>
                        <td className="text-center">
                          <FaEdit size={20} style={{marginLeft: 5, marginRight: 5}} color="#FFF" />
                          <FaTrash size={20} style={{marginLeft: 5, marginRight: 5}} color="#FFF" />
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
