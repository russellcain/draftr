import { useState, useMemo } from "preact/hooks";
import { TableRow } from "../types/table";

export interface TableProps {
  headers: string[];
  items: TableRow[];
}

const SALARY_LABEL = 'SALARY_CAP_HIT'

// Define the Island Component
export default function SearchTable({ headers, items }: TableProps) {
  // 1. State for filtering and sorting
  const [nameQuery, setNameQuery] = useState("");
  const [teamFilter, setTeamFilter] = useState("all");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc"); // Default descending

  // Extract unique teams for the filter dropdown
  const uniqueTeams = useMemo(() => [
    "all",
    ...new Set(items.map(item => item.team))
  ], [items]);


  // 2. Data Processing (Filtering and Sorting)
  const processedItems = useMemo(() => {
    let filtered = items;

    // A. Filtering by Team
    if (teamFilter !== "all") {
      filtered = filtered.filter(item => item.team === teamFilter);
    }

    // B. Filtering by Name
    if (nameQuery) {
      const query = nameQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(query)
      );
    }

    // C. Sorting by Salary
    const sorted = filtered.sort((a, b) => {
      // We only focus on salary for sorting logic as requested
      const aValue = a.salary_cap_hit;
      const bValue = b.salary_cap_hit;

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [items, nameQuery, teamFilter, sortDirection]);

  // Handler for sorting (only for the salary column)
  const handleSort = (column: string) => {
    if (column.toUpperCase() === SALARY_LABEL) {
      setSortDirection(prev => (prev === "asc" ? "desc" : "asc"));
    }
    // If we were sorting other columns, we'd setSortColumn here
  };

  return (
    <div className="p-4">
      {/* Controls: Name Filter and Team Filter */}
      <div className="flex gap-4 mb-4">
        {/* Name Search Input */}
        <input
          type="text"
          placeholder="Filter by Name"
          value={nameQuery}
          onInput={(e) => setNameQuery((e.target as HTMLInputElement).value)}
          className="p-2 border border-gray-300 rounded-lg w-1/2"
        />
        
        <select
          value={teamFilter}
          onChange={(e) => setTeamFilter((e.target as HTMLSelectElement).value)}
          className="p-2 border border-gray-300 rounded-lg w-1/4"
        >
          {uniqueTeams.map(team => (
            <option key={team} value={team}>{team.charAt(0).toUpperCase() + team.slice(1)}</option>
          ))}
        </select>
      </div>

      <div className="overflow-auto bg-white max-h-[75vh] shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="sticky top-0">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort(header)} // Attach sort handler to all headers
                >
                  {header.toUpperCase()}
                  {header.toUpperCase() === SALARY_LABEL && (
                    <span className="ml-2">
                      {sortDirection === 'asc' ? '▲' : '▼'}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {processedItems.map((item) => (
                <tr key={item.name + item.team}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.age}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.pos}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span>{item.salary_cap_hit.toLocaleString('us-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.team}
                    </td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}
