/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import {
  Col, Row, Container, OverlayTrigger, Tooltip,
} from 'react-bootstrap';
import AppContext from '../../Context';

const AwardsHeader = () => {
  const { state } = useContext(AppContext);

  if (state.data === undefined) {
    return null;
  }
  const totalCoins = state.data.awards.reduce((sum, award) => sum + (award.count * award.price), 0);
  const totalPremium = state.data.awards.reduce(
    (sum, award) => sum + (award.count * award.premium), 0,
  );
  return (
    <Container className="text-center my-5">
      <h2 className="text-center">{state.data.title}</h2>
      <div className="text-center text-muted mb-5">
        u/
        {state.data.author}
        {' | '}
        {state.data.subreddit}
        {' | '}
        {state.data.score}
        {' upvotes'}
      </div>
      <Row>
        <Col>
          <h2>
            {totalPremium}
          </h2>
          <h4>days of premium</h4>
        </Col>
        <Col>
          <h2>
            {totalCoins}
          </h2>
          <h4>total coins</h4>
        </Col>
        <Col>
          <CoinsSpent totalCoins={totalCoins} />
        </Col>
      </Row>
    </Container>
  );
};

const CoinsSpent = ({ totalCoins }) => {
  const upper = totalCoins * 0.004;
  const lower = totalCoins * 0.0024;

  if (upper < 1) {
    return (
      <div>
        <h2>$0</h2>
        <h4>spent on coins</h4>
      </div>
    );
  }
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={(
        <Tooltip>
          Reddit gives out some coins for free, so this total is likely to be lower
        </Tooltip>
      )}
    >
      <div>
        <h2>
          $
          {lower.toFixed(0)}
          {' - '}
          {upper.toFixed(0)}
        </h2>
        <h4>spent on coins*</h4>
      </div>
    </OverlayTrigger>
  );
};

export default AwardsHeader;
