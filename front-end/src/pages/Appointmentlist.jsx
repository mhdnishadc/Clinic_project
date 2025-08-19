import React, { useEffect, useState } from "react";
import api from "../services/Api";
import { Card, Container, Row, Col } from "react-bootstrap";

function Appointmentlist() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    api.get("/appointments/").then((res) => setAppointments(res.data));
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">My Appointments</h2>
      <Row>
        {appointments.length > 0 ? (
          appointments.map((app) => (
            <Col md={4} sm={6} xs={12} key={app.id} className="mb-4">
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <Card.Title className="text-primary">
                    {app.doctor_name}
                  </Card.Title>
                  <Card.Text>
                    <strong>Date:</strong> {app.appointment_date}
                  </Card.Text>
                  <Card.Text>
                    <strong>Slot:</strong>{" "}
                 {app.slot_time}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center text-muted">No appointments booked yet.</p>
        )}
      </Row>
    </Container>
  );
}

export default Appointmentlist;
