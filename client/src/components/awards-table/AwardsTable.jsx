/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { Table } from 'react-bootstrap';
import AppContext from '../../Context';

const AwardsTable = () => {
  const { state } = useContext(AppContext);
  if (!state.awards.length) {
    return <div className="text-center text-muted my-5">{state.message}</div>;
  }
  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th className="text-center">Image</th>
          <th className="text-center">Award Name</th>
          <th className="text-center">Cost (Coins)</th>
          <th className="text-center">Count</th>
          <th className="text-center">Premium</th>
          <th className="text-center">Total Coins</th>
        </tr>
      </thead>
      <tbody>
        {state.awards.map((award) => (
          <tr key={award.name}>
            <td className="text-center">
              <img
                src={award.image}
                alt="award icon"
                width="64"
                height="64"
                onError={(e) => { e.target.onerror = null; e.target.src = award.image_backup; }}
              />
            </td>
            <td className="text-center align-middle">{award.name}</td>
            <td className="text-right align-middle">{award.price}</td>
            <td className="text-right align-middle">{award.count}</td>
            <td className="text-right align-middle">{award.premium}</td>
            <td className="text-right align-middle">{award.count * award.price}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="4" />
          <th>Total Coins</th>
          <th className="text-right">
            {state.awards.reduce((sum, award) => sum + (award.count * award.price), 0)}
          </th>
        </tr>
      </tfoot>
    </Table>
  );
};

export default AwardsTable;
