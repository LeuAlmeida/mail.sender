import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
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
import { FaSpinner } from 'react-icons/fa';
import { Loading } from '../loading';

import api from '../../services/api';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      declaration: '',
      loading: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectFile = this.selectFile.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.handleDeclaration = this.handleDeclaration.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    (() => {
      if (window.localStorage) {
        if (!localStorage.getItem('firstLoad')) {
          localStorage.firstLoad = true;
          window.location.reload();
        } else localStorage.removeItem('firstLoad');
      }
    })();

    this.setState({ loading: false });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { file } = this.state;

    this.fileUpload(file);
  };

  selectFile = e => {
    this.setState({ file: e.target.files[0] });
  };

  handleDeclaration = e => {
    this.setState({ declaration: e.target.value });
  };

  fileUpload = async file => {
    const { declaration } = this.state;
    const { history } = this.props;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('declaration', declaration);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    if (!file) {
      toast.warn('Selecione um arquivo válido e tente novamente.');
    }

    if (!declaration) {
      toast.warn('Por favor, defina um nome para essa base.');
    }
    if (file && declaration) {
      try {
        await api.post('/files', formData, config);
        toast.success('Lista de destinatários importada com sucesso.');

        setTimeout(() => {
          history.push(`/admin/dashboard`);
        }, 1500);
      } catch (err) {
        return toast.error(
          'Erro ao importar a base. Por favor, verifique a extensão do arquivo e tente novamente.'
        );
      }
    }
  };

  render() {
    const { file, loading } = this.state;

    if (loading) {
      return (
        <Loading>
          <FaSpinner color="#000" size={48} />
        </Loading>
      );
    }

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
                      onChange={this.selectFile}
                    />

                    <p>
                      {this.state.file ? (
                        <span
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: 10,
                          }}
                        >
                          Arquivo selecionado:{' '}
                          <strong>{file && file.name}</strong>
                        </span>
                      ) : (
                        ''
                      )}
                    </p>
                    <hr />
                    <Label>Nome da Lista</Label>
                    <Input
                      type="text"
                      id="declaration"
                      name="declaration"
                      onChange={this.handleDeclaration}
                    />
                    <Button
                      className="btn-fill mt-md-4"
                      color="warning"
                      type="button"
                      style={{ width: '100%' }}
                      onClick={this.handleSubmit}
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
