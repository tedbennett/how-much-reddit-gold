import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import AppContext from '../../Context';

const UrlForm = () => {
  const [link, setLink] = useState('');
  const { dispatch } = useContext(AppContext);

  const updateAwards = (awards) => {
    dispatch({ type: 'UPDATE', data: awards });
  };

  const handleSubmit = async () => {
    const body = { url: link };
    const response = await fetch('/api/awards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const newAwards = await response.json();
    console.log(newAwards);
    updateAwards(newAwards);
  };

  const handleClear = () => {
    setLink('');
    updateAwards([]);
  };

  return (
    <Form>
      <Form.Group controlId="formUrl">
        <Form.Control
          type="text"
          placeholder="Paste reddit link"
          className="text-center"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="button" onClick={handleSubmit}>
        Submit
      </Button>
      <Button variant="primary" type="button" onClick={handleClear}>
        Clear
      </Button>
    </Form>
  );
};

export default UrlForm;
