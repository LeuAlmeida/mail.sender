import React, { Component } from 'react';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from 'reactstrap';

class CreateMailer extends Component {
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h5 className="title">Criar Ação</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Remetente</label>
                          <Input
                            defaultValue="informes@metodista.br"
                            disabled
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>E-mail do Remetente</label>
                          <Input type="select" name="select" id="exampleSelect">
                            <option style={{ backgroundColor: '#d570da' }}>
                              UMESP
                            </option>
                            <option style={{ backgroundColor: '#d570da' }}>
                              UNIMEP
                            </option>
                          </Input>
                        </FormGroup>
                      </Col>

                      <Col className="pr-md-1" md="8">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Assunto da Ação
                          </label>
                          <Input placeholder="mike@email.com" type="email" />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="4">
                        <FormGroup>
                          <label htmFor="">Autor do Disparo</label>
                          <Input
                            type="text"
                            defaultValue="Léu Almeida"
                            disabled
                          />
                        </FormGroup>
                      </Col>

                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label htmFor="">Agendar Envio</label>
                          <Input
                            type="datetime-local"
                            style={{ textTransform: 'uppercase' }}
                          />
                        </FormGroup>
                      </Col>

                      <Col className="pl-md-1" md="3">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            URL da Mensagem
                          </label>
                          <Input placeholder="mike@email.com" type="email" />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="3">
                        <FormGroup>
                          <Button
                            className="btn-fill mt-md-4"
                            color="warning"
                            type="button"
                            style={{ width: '100%' }}
                          >
                            Visualizar
                          </Button>
                        </FormGroup>
                      </Col>
                      <Col className="py-md-1" md="12">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Destinatários
                          </label>
                          <Input placeholder="leonardo.almeida@metodista.br" type="textarea" />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" type="submit">
                    Save
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default CreateMailer;
