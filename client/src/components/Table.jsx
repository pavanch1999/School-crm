import React, { useMemo, useState } from "react";

const Table = ({ columns, data, onEdit, onDelete }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              onClick={() => requestSort(column.key)}
              className="p-3 border-b border-gray-300 text-left cursor-pointer"
            >
              {column.label}
              {sortConfig.key === column.key && <span>{sortConfig.direction === "asc" ? " ▲" : " ▼"}</span>}
            </th>
          ))}
          {(onEdit || onDelete) && <th className="p-3 border-b border-gray-300">Actions</th>}
        </tr>
      </thead>
      <tbody>
  {sortedData.map((row) => (
    <tr key={row._id || row.contact} className="hover:bg-gray-50">
      {columns.map((column) => (
        <td key={`${row._id}-${column.key}`} className="p-3 border-b border-gray-300">
        {column.key === "dob" ? new Date(row[column.key]).toLocaleDateString() : row[column.key]}
      </td>
      
      ))}
      {(onEdit || onDelete) && (
        <td key={`${row._id}-actions`} className="p-3 border-b border-gray-300">
          {onEdit && (
            <button onClick={() => onEdit(row)} className="text-blue-500 hover:text-blue-700 mr-2">
              Edit
            </button>
          )}
          {onDelete && (
            <button onClick={() => onDelete(row._id)} className="text-red-500 hover:text-red-700">
              Delete
            </button>
          )}
        </td>
      )}
    </tr>
  ))}
</tbody>

    </table>
  );
};

export default Table;
