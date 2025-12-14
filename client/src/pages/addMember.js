import React, { useState } from 'react';
import { Form, Button, Container,Card } from 'react-bootstrap';
import axios from 'axios';
import { useUser } from '../UserContext';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/navbar';

export default function AddMember() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(false);

  const { userId } = useUser();
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!privacyConsent) return alert('Please consent to privacy policy');

    try {
      const res = await axios.post(
        'http://localhost:5001/addmemberdata',
        { name, age, gender, deviceId, parentid: userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if(res && res.data && res.data.member)
     { alert('Member added successfully');
      navigate('/home');
    }
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <>
    <NavBar />

<Container
  className="d-flex justify-content-center"
  style={{ marginTop: "50px", marginBottom: "50px" }}
>
  <Card
    className="shadow-lg border-0"
    style={{
      width: "100%",
      maxWidth: "450px",
      borderRadius: "16px",
    }}
  >
    <Card.Body className="p-4">
      {/* Title */}
      <div className="text-center mb-4">
        <h3 className="fw-bold">Add New Member</h3>
        <p className="text-muted">
          Enter member details to start health monitoring
        </p>
      </div>

      {/* Form */}
      <Form onSubmit={handleAddMember}>
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ borderRadius: "10px", height: "45px" }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            style={{ borderRadius: "10px", height: "45px" }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Gender</Form.Label>
          <Form.Select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            style={{ borderRadius: "10px", height: "45px" }}
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Device ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter device ID"
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
            required
            style={{ borderRadius: "10px", height: "45px" }}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Check
            type="checkbox"
            label="I consent to the privacy policy and data usage"
            checked={privacyConsent}
            onChange={(e) => setPrivacyConsent(e.target.checked)}
          />
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="w-100"
          size="lg"
          disabled={!privacyConsent}
          style={{ borderRadius: "10px" }}
        >
          Add Member
        </Button>
      </Form>
    </Card.Body>
  </Card>
</Container>
    </>
  );
}
