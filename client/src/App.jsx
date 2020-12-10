import React, { useReducer } from 'react';
import { Container } from 'react-bootstrap';
import UrlForm from './components/url-form/UrlForm';
import AwardsTable from './components/awards-table/AwardsTable';
import AppContext from './Context';

const initialState = {
  awards: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE':
      return {
        awards: action.data,
      };

    default:
      return initialState;
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Container className="App">
      <AppContext.Provider value={{ state, dispatch }}>
        <UrlForm />
        <AwardsTable />
      </AppContext.Provider>
    </Container>
  );
}

export default App;
