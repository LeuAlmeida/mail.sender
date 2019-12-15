import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios, { post } from 'axios';
import {
  FormGroup,
  Row,
  Col,
  Label,
  CustomInput,
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
} from 'reactstrap';

import api from '../../services/api';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }

  onFormSubmit = e => {
    e.preventDefault(); // Stop form submit
    try {
      this.fileUpload(this.state.file).then(response => {
        toast.success('Lista de destinatários enviada com sucesso.');
      });
    } catch (err) {
      toast.error('Erro ao enviar a lista de destinatários.');
    }
  };

  onChange = e => {
    this.setState({ file: e.target.files[0] });
  };

  fileUpload = async file => {
    const formData = new FormData();
    formData.append('file', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    return api.post('/files', formData, config);
  };

  render() {
    return (
      <>
        <ToastContainer autoClose={4500} />
        <div className="content">
          <Row>
            <Col className="py-md-1" md="6">
              <Card>
                <CardHeader>
                  <h5 className="title">Importar base de contatos</h5>
                </CardHeader>
                <CardBody>
                  <FormGroup>
                    <Label for="file">Extrair destinatários</Label>
                    <CustomInput
                      type="file"
                      id="file"
                      name="file"
                      className="text-primary"
                      onChange={this.onChange}
                    />
                    <Label>Nome da Lista</Label>
                    <Input />
                    <Button
                      className="btn-fill mt-md-4"
                      color="warning"
                      type="button"
                      style={{ width: '100%' }}
                      onClick={this.onFormSubmit}
                    >
                      Enviar
                    </Button>
                  </FormGroup>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Upload;
