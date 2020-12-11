import React, { useReducer } from 'react';
import { Container } from 'react-bootstrap';
import UrlForm from './components/url-form/UrlForm';
import AwardsTable from './components/awards-table/AwardsTable';
import AppContext from './Context';
import AwardsHeader from './components/awards-header/AwardsHeader';

const initialState = {
  message: 'Paste a reddit link to see its awards',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      return {
        data: action.data,
        message: action.message,
      };

    default:
      return initialState;
  }
};
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <Container className="App">
        <h1 className="text-center my-5">How Much Reddit Gold?</h1>
        <AppContext.Provider value={{ state, dispatch }}>
          <UrlForm />
          <AwardsHeader />
          <AwardsTable />
        </AppContext.Provider>

      </Container>
      <div className="fixed-bottom text-center p-2 bg-white">
        <a href="https://www.github.com/tedbennett" className="text-muted">Made by Ted Bennett</a>
      </div>
    </div>
  );
};

export default App;
