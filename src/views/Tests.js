import React from 'react';
import { FormGroup, Row, Col, Label, CustomInput } from 'reactstrap';

export default function Tests() {
  return (
    <Row>
      <Col className="py-md-1" md="8">
        <FormGroup>
          <Label for="importRecipients">Extrair destinatários</Label>
          <CustomInput
            type="file"
            id="importRecipients"
            name="customFile"
            className="text-primary"
          />
        </FormGroup>
      </Col>
    </Row>
  );
}
