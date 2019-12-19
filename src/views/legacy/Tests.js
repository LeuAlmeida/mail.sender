import React, { Component } from 'react';
import {
  Input,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
} from 'reactstrap';

import { addHours, parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

class Tests extends Component {
  state = {
    date: null,
  };

  formatDate = date => {
    format(date, "'dia' dd 'de' MMMM', às' H:mm'h'", { locale: pt });
  };

  handleSetDate = e => {
    const date = format(
      addHours(parseISO(e.target.value), 3),
      "yyy'-'MM'-'dd'T'H:mm:ss"
    );

    this.setState({ date });

    console.log(this.formatDate(new Date(date)));
  };

  render() {
    return (
      <>
        <Row>
          <Col md="6">
            <Card>
              <CardHeader>
                <CardTitle tag="h1">Título</CardTitle>
              </CardHeader>
              <Col md="6">
                <Input
                  type="datetime-local"
                  style={{ textTransform: 'uppercase' }}
                  onChange={this.handleSetDate}
                />
              </Col>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

export default Tests;
