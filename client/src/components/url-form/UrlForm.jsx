import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import AppContext from '../../Context';

const UrlForm = () => {
  const [link, setLink] = useState('');
  const { dispatch } = useContext(AppContext);

  const updateAwards = (awards, message) => {
    dispatch({ type: 'UPDATE', data: { awards, message } });
  };

  const handleSubmit = async () => {
    updateAwards([], 'Loading...');
    const body = { url: link };
    const response = await fetch('/api/awards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    let newAwards = await response.json();
    let message = '';
    if (newAwards.name === 'Error') {
      newAwards = [];
      message = 'Invalid URL';
    } else if (!newAwards.length) {
      newAwards = [];
      message = "Couldn't find any awards from that URL";
    }
    updateAwards(newAwards, message);
  };

  const handleClear = () => {
    setLink('');
    updateAwards([], 'Paste a reddit link to see its awards');
  };

  return (
    <Form className="text-center">
      <Form.Group controlId="formUrl">
        <Form.Control
          type="text"
          placeholder="Paste reddit link"
          className="text-center"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="button" style={{ margin: 10 }} onClick={handleSubmit}>
        Submit
      </Button>
      <Button variant="primary" type="button" style={{ margin: 10 }} onClick={handleClear}>
        Clear
      </Button>
    </Form>
  );
};

export default UrlForm;
