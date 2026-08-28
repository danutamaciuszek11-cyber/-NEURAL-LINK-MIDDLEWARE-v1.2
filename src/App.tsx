import React from 'react';
import Dashboard from './components/Dashboard';

export default function App() {
  return (
    <div style={{ background: '#000', color: '#00ffff', minHeight: '100vh', fontFamily: 'monospace', padding: '20px' }}>
      <h1>NEURAL-LINK MIDDLEWARE v1.2</h1>
      <Dashboard />
    </div>
  );
}
