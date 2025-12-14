import React from "react";
import { Container, Navbar, Nav, Button, Row, Col,Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
       {/* NAVBAR */}
       <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        sticky="top"
        className="shadow-sm"
      >
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
            🩺 Health System
          </Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ms-auto align-items-center gap-2">
              <Nav.Link as={Link} to="/home">
                Home
              </Nav.Link>

              <Button
                variant="outline-light"
                size="sm"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>

              <Button
                variant="success"
                size="sm"
                onClick={() => navigate("/register")}
              >
                Get Started
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* HERO SECTION */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #0d6efd 0%, #0b5ed7 100%)",
          color: "white",
          padding: "90px 0",
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="display-5 fw-bold mb-4">
                Smart Health Monitoring Platform
              </h1>
              <p className="lead mb-4">
                Monitor vital health data in real time. Track heartbeat,
                blood pressure, and receive instant alerts for critical
                conditions.
              </p>
              <Button
                variant="light"
                size="lg"
                className="me-3"
                onClick={() => navigate("/register")}
              >
                Create Account
              </Button>
              <Button
                variant="outline-light"
                size="lg"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </Col>

            <Col md={6} className="text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png"
                alt="health"
                style={{ maxWidth: "80%" }}
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* FEATURES SECTION */}
      <Container className="py-5">
        <h2 className="text-center fw-bold mb-5">
          Why Choose Health System?
        </h2>

        <Row>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm border-0 text-center p-4">
              <h4 className="mb-3">📊 Real-Time Monitoring</h4>
              <p>
                Live tracking of health metrics updated every few seconds for
                accuracy and safety.
              </p>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm border-0 text-center p-4">
              <h4 className="mb-3">🚨 Smart Alerts</h4>
              <p>
                Automatic alerts when vital signs exceed safe thresholds—act
                before it’s critical.
              </p>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm border-0 text-center p-4">
              <h4 className="mb-3">👥 Easy Member Management</h4>
              <p>
                Add, view, and manage multiple members through a simple and
                intuitive dashboard.
              </p>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* FOOTER */}
      <footer
        style={{
          backgroundColor: "#212529",
          color: "#adb5bd",
          padding: "20px 0",
        }}
      >
        <Container className="text-center">
          <p className="mb-0">
            © {new Date().getFullYear()} Health System. All rights reserved.
          </p>
        </Container>
      </footer>
    </>
  );
}
