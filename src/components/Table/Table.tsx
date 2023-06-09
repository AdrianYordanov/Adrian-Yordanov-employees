import React from "react";

interface Props {
  headers: string[];
  rows: string[][];
}

const Table: React.FC<Props> = ({ headers, rows }) => {
  return (
    <table>
      <thead>
        <tr>
          {headers.map((titleCol) => (
            <th key={titleCol}>{titleCol}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowKey) => {
          return (
            <tr key={rowKey}>
              {row.map((cell, cellKey) => (
                <td key={`${rowKey}-${cellKey}`}>{cell}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
