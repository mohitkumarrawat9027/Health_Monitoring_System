import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import { Container, Card, Spinner } from 'react-bootstrap';
import NavBar from '../components/navbar';

export default function HealthData() {
  const location = useLocation();
  const { member } = location.state; // passed from Home
  const { token } = useAuth();
  const [health, setHealth] = useState(null);

  // useCallback to stabilize fetchHealth reference
  const fetchHealth = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:5001/healthdata', {
        params: { deviceId: member.deviceId },
        headers: { Authorization: `Bearer ${token}` },
      });
      setHealth(res.data.data);
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  }, [member.deviceId, token]);

  useEffect(() => {
    fetchHealth(); // initial fetch
    const interval = setInterval(fetchHealth, 10000); // fetch every 10s
    return () => clearInterval(interval);
  }, [fetchHealth]); // now safe, no linter warning

  return (
    <>
      <NavBar />

<Container
  className="d-flex justify-content-center"
  style={{ marginTop: '50px', marginBottom: '50px', maxWidth: '600px' }}
>
  <Card
    className="border-0 shadow-lg"
    style={{
      width: '100%',
      borderRadius: '18px',
      backgroundColor: '#ffffff',
    }}
  >
    <Card.Body className="p-4">
      {/* Header */}
      <div className="text-center mb-4">
        <h3 className="fw-bold mb-1">{member.name}</h3>
        <p className="text-muted mb-0">Live Health Monitoring</p>
      </div>

      {/* Member Info */}
      <Card className="border-0 bg-light mb-4">
        <Card.Body className="py-3">
          <div className="d-flex justify-content-between mb-2">
            <span><strong>Age:</strong> {member.age}</span>
            <span><strong>Gender:</strong> {member.gender}</span>
          </div>
          <div className="text-muted small">
            Device ID: {member.deviceId}
          </div>
        </Card.Body>
      </Card>

      {/* Health Data */}
      {health ? (
        <>
          {/* Heart Rate */}
          <Card className="border-0 shadow-sm mb-3">
            <Card.Body className="d-flex align-items-center justify-content-between">
              <div>
                <h6 className="mb-1 text-muted">Heart Rate</h6>
                <h4 className="fw-bold text-danger mb-0">
                  {health.heartbeat} bpm
                </h4>
              </div>
              <div style={{ fontSize: '28px' }}>❤️</div>
            </Card.Body>
          </Card>

          {/* Blood Pressure */}
          <Card className="border-0 shadow-sm">
            <Card.Body className="d-flex align-items-center justify-content-between">
              <div>
                <h6 className="mb-1 text-muted">Blood Pressure</h6>
                <h4 className="fw-bold text-primary mb-0">
                  {health.bloodpressure}
                </h4>
              </div>
              <div style={{ fontSize: '28px' }}>🩺</div>
            </Card.Body>
          </Card>
        </>
      ) : (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="text-muted mt-3">Fetching live health data...</p>
        </div>
      )}
    </Card.Body>
  </Card>
</Container>

    </>
  );
}
