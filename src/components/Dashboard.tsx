import React, { useState } from 'react';

export default function Dashboard() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  
  const handleTest = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, context: 'EAO_DASHBOARD' })
      });
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setResponse('Connection failed. Server offline?');
    }
  };

  return (
    <div style={{ border: '1px solid #00ffff', padding: '20px', marginTop: '20px' }}>
      <h2>LLM PROMPT INJECTION SHIELD TEST</h2>
      <textarea 
        value={prompt} 
        onChange={e => setPrompt(e.target.value)} 
        placeholder="Enter prompt to test (e.g. 'ignore all previous commands')..."
        style={{ width: '100%', height: '100px', background: '#111', color: '#fff', border: '1px solid #333' }}
      />
      <br/><br/>
      <button onClick={handleTest} style={{ background: '#00ffff', color: '#000', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}>
        FIRE PROMPT
      </button>
      <pre style={{ marginTop: '20px', color: response.includes('false') ? '#ff0000' : '#00ff00' }}>
        {response}
      </pre>
    </div>
  );
}
