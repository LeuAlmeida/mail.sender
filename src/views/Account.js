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
  CardText,
} from 'reactstrap';

class Account extends Component {
  state = {};

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h5 className="title">Atualizar Perfil</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="3">
                        <FormGroup>
                          <label>Remetente</label>
                          <Input
                            defaultValue="informes@metodista.br"
                            placeholder="Username"
                            disabled
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="5">
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

                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Email address
                          </label>
                          <Input placeholder="mike@email.com" type="email" />
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
            <Col md="4">
              <Card className="card-user">
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar"
                        src={require('assets/img/emilyz.jpg')}
                      />
                      <h5 className="title">Mike Andrew</h5>
                    </a>
                    <p className="description">Ceo/Co-Founder</p>
                  </div>
                  <div className="card-description">
                    Do not be scared of the truth because we need to restart the
                    human foundation in truth And I love you like Kanye loves
                    Kanye I love Rick Owens’ bed design but the back is...
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="button-container">
                    <Button className="btn-icon btn-round" color="facebook">
                      <i className="fab fa-facebook" />
                    </Button>
                    <Button className="btn-icon btn-round" color="twitter">
                      <i className="fab fa-twitter" />
                    </Button>
                    <Button className="btn-icon btn-round" color="google">
                      <i className="fab fa-google-plus" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Account;
