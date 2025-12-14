import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../UserContext';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Container,Row,Col } from 'react-bootstrap';
import  NavBar from '../components/navbar';

export default function Home() {
  const [members, setMembers] = useState([]);
  const { userId } = useUser();
  const {token} = useAuth();
  const navigate = useNavigate();

  

  const deleteMember = async (id) => {
    try {
      const res = await axios.delete(`https://health-monitoring-system-chi.vercel.app/deletememberdata/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.member) {
        setMembers((prev) => prev.filter((m) => m._id !== id));
      }
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get('https://health-monitoring-system-chi.vercel.app/memberdata', {
          params: { parentid: userId },
          headers: { Authorization: `Bearer ${token}` },
        });
        if(res && res.data && res.data.data)
        setMembers(res.data.data || []);
      } catch (err) {
        alert(err.response?.data?.message || err.message);
      }
    };
    fetchMembers();
  }, [userId, token]);

  return (
    <>
      <NavBar />

<Container style={{ marginTop: '40px', marginBottom: '40px' }}>
  {/* Header */}
  <div className="d-flex justify-content-between align-items-center mb-4">
    <h2 style={{ fontWeight: 700, color: '#333' }}>My Members</h2>

    <Button
      variant="primary"
      onClick={() => navigate('/addmember')}
    >
      + Add Member
    </Button>
  </div>

  {/* Empty State */}
  {members.length === 0 ? (
    <div className="text-center text-muted mt-5">
      <h5>No members added yet</h5>
      <p>Start by adding your first member</p>
      <Button variant="outline-primary" onClick={() => navigate('/addmember')}>
        Add Member
      </Button>
    </div>
  ) : (
    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
      {members.map((m) => (
        <Col key={m._id}>
          <Card
            className="h-100 border-0 shadow-sm member-card"
            style={{ borderRadius: '16px' }}
          >
            <Card.Body className="d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <Card.Title className="mb-0 fw-semibold">
                    {m.name}
                  </Card.Title>

                  {/* Status badge (future-ready) */}
                  <span className="badge bg-success">Active</span>
                </div>

                <Card.Text className="mb-1">
                  <strong>Age:</strong> {m.age}
                </Card.Text>
                <Card.Text className="mb-1">
                  <strong>Gender:</strong> {m.gender}
                </Card.Text>
                <Card.Text className="mb-3 text-muted small">
                  Device ID: {m.deviceId}
                </Card.Text>
              </div>

              <div className="d-flex gap-2 mt-3">
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="w-100"
                  onClick={() =>
                    navigate('/memberhealthdata', { state: { member: m } })
                  }
                >
                  View Health
                </Button>

                <Button
                  variant="outline-danger"
                  size="sm"
                  className="w-100"
                  onClick={() => deleteMember(m._id)}
                >
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )}
</Container>
    </>
  );
}
