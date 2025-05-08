import React, { useState } from 'react'; // Add useState for state management
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button'; // Import Button from react-bootstrap
import Form from 'react-bootstrap/Form'; // Correct Form import
import AddProduct from '../components/FormProduct';

export default function Profil() {
  const [validated, setValidated] = useState(false); // Define validated state

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Ajouter un produit</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="first" className="m-2 h-100">
              <Form
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
                className="d-flex flex-column justify-content-center align-content-center"
              >
                <Row className="m-2 align-items-center">
                  <Form.Group controlId="validationCustom01" className="p-2 d-flex justify-content-center">
                    <Form.Control required readOnly type="text" placeholder="USERNAME"
                      style={{
                        width: '300px',
                        textAlign: 'center',
                        height: '50px',
                        borderRadius: '5px',
                      }} />
                  </Form.Group>

                  <Form.Group
                    controlId="validationCustom04"
                    className="p-2 d-flex justify-content-center"
                  >
                    <Form.Control
                      required
                      readOnly
                      type="text"
                      placeholder="EMAIL"
                      style={{
                        width: '300px',
                        height: '50px',
                        textAlign: 'center',
                        borderRadius: '5px',
                      }}
                    />
                  </Form.Group>

                  <Form.Group
                    controlId="validationCustom02"
                    className="p-2 d-flex justify-content-center"
                  >
                    <Form.Control
                      required
                      type="text"
                      placeholder="MOT DE PASS"
                      style={{
                        width: '300px',
                        textAlign: 'center',
                        height: '50px',
                        borderRadius: '5px',
                      }}
                    />
                  </Form.Group>
                </Row>
                <Button type="submit" >
                  MODIFIER
                </Button>
              </Form>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <AddProduct />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}
