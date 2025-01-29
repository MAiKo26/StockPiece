import React from 'react';
import './Leaderboard.css';
import { mockLeaderboardData } from '../../assets/data/sampleLb'

const LeaderboardPage: React.FC = () => {
  return (
    <div className="page-container">
      <div className="leaderboard-container">
        <h2 className="leaderboard-title">Grand Line's Top Investors</h2>
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Pirate Name</th>
              <th>Total Treasure</th>
              <th>Favorite Stock</th>
              <th>Profit %</th>
            </tr>
          </thead>
          <tbody>
            {mockLeaderboardData.map((entry) => (
              <tr key={entry.rank} className={entry.rank === 1 ? 'top-rank' : ''}>
                <td>#{entry.rank}</td>
                <td>{entry.username}</td>
                <td>{entry.totalValue.toLocaleString()} ₿</td>
                <td>{entry.topStock}</td>
                <td className={entry.profitPercentage >= 100 ? 'profit-high' : 'profit-normal'}>
                  {entry.profitPercentage}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardPage;