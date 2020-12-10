import React, { useState } from 'react';

function App() {
  const [link, setLink] = useState('');
  const [awards, setAwards] = useState([]);

  const handleSubmit = async () => {
    const body = { url: link };
    const response = await fetch('/api/awards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const results = await response.json();
    console.log(results);
    setAwards(results);
  };

  const handleInputChange = (e) => {
    setLink(e.target.value);
  };
  return (
    <div className="App">
      <input type="text" placeholder="Paste reddit link here" value={link} onChange={handleInputChange} />
      <button type="button" onClick={handleSubmit}>Submit</button>
      <div>{awards.length}</div>
    </div>
  );
}

export default App;
