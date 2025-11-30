import { TableRow } from "../types/table";

export interface TableProps {
  headers: string[];
  items: TableRow[]
}

export default function Table(props: TableProps) {

  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table Header */}
          <thead>
            <tr>
              {props.headers.map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {props.items.map((item) => (
              <tr key={item.name}>
                {/* Iterate over the values of each item */}
                {Object.values(item).map((value, index) => (
                  <td
                    key={index}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
}
