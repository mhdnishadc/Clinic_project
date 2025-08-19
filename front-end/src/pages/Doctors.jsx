import React, { useEffect, useState } from "react";
import api from "../services/Api";
import { Card, Button, Container, Row, Col, Navbar, Nav } from "react-bootstrap";

function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    api.get("/doctors/").then((res) => setDoctors(res.data));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // clear token
    window.location.href = "/";  // redirect to login page
  };

  return (
    <>
      {/* Top Navbar */}
      <Navbar bg="light" expand="lg" className="mb-4 shadow-sm">
        <Container>
          <Navbar.Brand href="/">Doctor Booking</Navbar.Brand>
          <Nav className="ms-auto">
            <Button variant="outline-danger" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {/* Doctors List */}
      <Container>
        <h2 className="text-center mb-4">Available Doctors</h2>
        <Row>
          {doctors.map((doc) => (
            <Col md={4} sm={6} xs={12} key={doc.id} className="mb-4">
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Card.Title>{doc.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {doc.speciality}
                  </Card.Subtitle>
                  <Button
                    variant="primary"
                    onClick={() => (window.location.href = `/book/${doc.id}`)}
                  >
                    Book Appointment
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Doctors;
