/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { Table } from 'react-bootstrap';
import AppContext from '../../Context';

const AwardsTable = () => {
  const { state } = useContext(AppContext);
  if (state.data === undefined) {
    return <div className="text-center text-muted my-5">{state.message}</div>;
  }
  if (state.data.awards.length === 0) {
    return (
      <div className="text-center text-muted my-5">
        Couldn&apos;t find any awards for this post
      </div>
    );
  }
  return (
    <div>
      <Table bordered hover className="my-5">
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
          {state.data.awards.map((award) => (
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
              {state.data.awards.reduce((sum, award) => sum + (award.count * award.price), 0)}
            </th>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
};

export default AwardsTable;
