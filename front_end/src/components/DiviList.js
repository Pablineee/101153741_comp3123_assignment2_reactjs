import React, { useEffect, useState } from 'react';
import { getDivi } from '../api';
import '../assets/styles/DiviList.css'; // Add custom styles

const DiviList = () => {
  const [diviData, setDiviData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDivi();
        setDiviData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const formatActualResult = (value) => {
    if (value === 1) return 'Over';
    if (value === 0) return 'Under';
    if (value === 2) return 'Pending';
    return 'Unknown';
  };

  const formatPrediction = (value) => {
    if (value === 1) return 'Over';
    if (value === 0) return 'Under';
    return 'Unknown';
  };

  const getRowClass = (predicted, actual) => {
    if (actual === 2) return 'table-warning'; // Yellow for Pending
    if (predicted === actual) return 'table-success'; // Green for Match
    return 'table-danger'; // Red for Mismatch
  };

  return (
    <div className="container mt-5">
      <header className="divi-header">
        <h1>Divi Data</h1>
      </header>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Date</th>
              <th>Match Details</th>
              <th>Over Odds</th>
              <th>Under Odds</th>
              <th>Prediction</th>
              <th>Actual Result</th>
              <th>Success Rate</th>
            </tr>
          </thead>
          <tbody>
            {diviData.map((item) => (
              <tr key={item._id} className={getRowClass(item.Predicted_Outcome, item.Actual_Result)}>
                <td>{item.Date}</td>
                <td>{item.Match_Details}</td>
                <td>{item.Over_Odds}</td>
                <td>{item.Under_Odds}</td>
                <td>{formatPrediction(item.Predicted_Outcome)}</td>
                <td>{formatActualResult(item.Actual_Result)}</td>
                <td>{item['Success Rate']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DiviList;
