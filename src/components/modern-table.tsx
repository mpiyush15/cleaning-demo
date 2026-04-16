import React from "react";

interface TableColumn {
  key: string;
  label: string;
  width?: string;
}

interface TableRow {
  [key: string]: string | number | React.ReactNode;
}

interface ModernTableProps {
  columns: TableColumn[];
  data: TableRow[];
  title?: string;
}

export function ModernTable({ columns, data, title }: ModernTableProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
      {title && (
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"
                  style={{ width: column.width }}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {data.map((row, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-slate-50 transition">
                {columns.map((column) => (
                  <td
                    key={`${rowIdx}-${column.key}`}
                    className="px-6 py-4 text-sm text-slate-700"
                  >
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.length === 0 && (
        <div className="px-6 py-12 text-center">
          <p className="text-sm text-slate-500">No data available</p>
        </div>
      )}
    </div>
  );
}
