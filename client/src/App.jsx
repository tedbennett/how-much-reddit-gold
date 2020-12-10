import React, { useReducer } from 'react';
import { Container } from 'react-bootstrap';
import UrlForm from './components/url-form/UrlForm';
import AwardsTable from './components/awards-table/AwardsTable';
import AppContext from './Context';

const initialState = {
  awards: [],
  message: 'Paste a reddit link to see its awards',
};

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE':
      return {
        awards: action.data.awards,
        message: action.data.message,
      };

    default:
      return initialState;
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Container className="App">
      <h1 className="text-center" style={{ marginTop: 50, marginBottom: 50 }}>How Much Gold?</h1>
      <AppContext.Provider value={{ state, dispatch }}>
        <UrlForm />
        <AwardsTable />
      </AppContext.Provider>
    </Container>
  );
}

export default App;
