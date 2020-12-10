import React, { useContext } from 'react';
import { Table } from 'react-bootstrap';
import AppContext from '../../Context';

const AwardsTable = () => {
  const { state } = useContext(AppContext);
  console.log(state);
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Image</th>
          <th>Award Name</th>
          <th>Cost (Coins)</th>
          <th>Count</th>
          <th>Total Coins</th>
        </tr>
      </thead>
      <tbody>
        {state.awards.map((award) => (
          <tr>
            <td>
              <img src={award.image} alt="award icon" />
            </td>
            <td>{award.name}</td>
            <td>{award.price}</td>
            <td>{award.count}</td>
            <td>{award.count * award.price}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AwardsTable;
