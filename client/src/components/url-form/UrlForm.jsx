import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import AppContext from '../../Context';

const UrlForm = () => {
  const [link, setLink] = useState('');
  const { dispatch } = useContext(AppContext);

  const dispatchResponse = (message, data) => {
    dispatch({ type: 'UPDATE', message, data });
  };

  const handleSubmit = async () => {
    dispatchResponse('Loading...');
    const body = { url: link };
    const response = await fetch('/api/awards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const json = await response.json();
    dispatchResponse(json.message, json.data);
  };

  const handleClear = () => {
    setLink('');
    dispatchResponse('Paste a reddit link to see its awards');
  };

  return (
    <Form className="text-center mb-3">
      <Form.Group controlId="formUrl">
        <Form.Control
          type="text"
          placeholder="Paste reddit link"
          className="text-center"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="button" className="m-2" onClick={handleSubmit}>
        Submit
      </Button>
      <Button variant="secondary" type="button" className="m-2" onClick={handleClear}>
        Clear
      </Button>
    </Form>
  );
};

export default UrlForm;
