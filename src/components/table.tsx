interface TableColumn {
  key: string;
  label: string;
  width?: string;
  render?: (value: unknown) => React.ReactNode;
}

interface TableProps {
  columns: TableColumn[];
  data: Record<string, unknown>[];
  className?: string;
}

export function Table({ columns, data, className = "" }: TableProps) {
  return (
    <div className={`overflow-x-auto rounded-lg border border-gray-200 ${className}`}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-6 py-4 text-left text-sm font-semibold text-gray-900 ${col.width || ""}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition">
              {columns.map((col) => (
                <td
                  key={`${idx}-${col.key}`}
                  className={`px-6 py-4 text-sm text-gray-700 ${col.width || ""}`}
                >
                  {col.render ? col.render(row[col.key]) : String(row[col.key] || "-")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
