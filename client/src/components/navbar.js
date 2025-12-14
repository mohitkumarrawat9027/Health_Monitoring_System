import React from 'react';
import { Button, Container, Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useUser } from '../UserContext';

export default function NavBar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { signout } = useUser();

  const handleLogout = () => {
    logout();
    signout();
    navigate('/login');
  };

  return (
    <Navbar
    bg="dark"
    variant="dark"
    expand="lg"
    sticky="top"
    className="shadow-sm"
  >
    <Container>
      {/* Brand */}
      <Navbar.Brand
        as={Link}
        to="/home"
        className="fw-bold fs-4 d-flex align-items-center"
        style={{ letterSpacing: "0.5px" }}
      >
        🩺 <span className="ms-2">Health System</span>
      </Navbar.Brand>
  
      {/* Mobile Toggle */}
      <Navbar.Toggle aria-controls="main-navbar" />
      <Navbar.Collapse id="main-navbar">
        
        {/* Left Nav */}
        <Nav className="me-auto">
          <Nav.Link
            as={Link}
            to="/home"
            className="fw-semibold"
          >
            Dashboard
          </Nav.Link>
        </Nav>
  
        {/* Right Actions */}
        <Nav className="align-items-center gap-3">
          {/* Optional user indicator */}
          <span className="text-light small d-none d-lg-block">
            Logged in
          </span>
  
          <Button
            variant="outline-success"
            size="sm"
            className="px-3"
            onClick={() => navigate("/addmember")}
          >
            + Add Member
          </Button>
  
          <Button
            variant="outline-danger"
            size="sm"
            className="px-3"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  
  );
}
