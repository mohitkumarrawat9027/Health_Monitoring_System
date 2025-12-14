import React, { useState } from 'react';
import { Form, Button, Container,Card } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { signin } = useUser();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/register', { email, password });
      if (res.data.token) {
        login(res.data.token);
        signin(res.data.userId);
        navigate('/');
      }
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <Container
    className="d-flex justify-content-center align-items-center"
    style={{ minHeight: "100vh", background: "#f5f7fa" }}
  >
    <Card
      className="shadow-lg border-0"
      style={{ width: "100%", maxWidth: "420px", borderRadius: "16px" }}
    >
      <Card.Body className="p-4">
        {/* Title */}
        <div className="text-center mb-4">
          <h2 className="fw-bold">Create Account</h2>
          <p className="text-muted">
            Start monitoring health data securely
          </p>
        </div>

        {/* Form */}
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ height: "45px", borderRadius: "10px" }}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Create a password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ height: "45px", borderRadius: "10px" }}
            />
          </Form.Group>

          <Button
            type="submit"
            variant="success"
            className="w-100"
            size="lg"
            style={{ borderRadius: "10px" }}
          >
            Register
          </Button>
        </Form>

        {/* Footer */}
        <div className="text-center mt-4">
          <small className="text-muted">
            Already have an account?{" "}
            <span
              style={{ color: "#198754", cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </small>
        </div>
      </Card.Body>
    </Card>
  </Container>
  );
}
