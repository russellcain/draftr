import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import HomePageButton from "../islands/HomePageButton";
import { TableData, TableRow } from "../types/table";

export const handler: Handlers<TableData> = {
  async GET(_req: Request, ctx: HandlerContext<TableData>) {
    try {
      const jsonText = await Deno.readTextFile("./data/player-salaries.json");

      const items: TableData = JSON.parse(jsonText);
      return { data: items };
    } catch (error) {
      console.error(`Unable to load player data. Error:${error}`);
      return new Response("Internal Service Error: Cannot load player data", {
        status: 500,
      });
    }
  },
};

export default function TablePage({ data }: PageProps<TableData>) {
  const items = data;
  const headers = items.length > 0 ? Object.keys(items[0]) : []; // all fields are uniformly of the shape PlayerData

  return (
    <div class="p-8 mx-auto max-w-4xl">
        <div class="flex items-center justify-between mb-6">
            <div class="w-1/2"> 
                <h1 class="text-3xl font-bold text-left">
                    User Data Table
                </h1>
            </div>
        
            <div class="w-1/2 flex justify-end">
            {/* NOTE: You will need to create and import this HomepageButton component */}
            <HomePageButton /> 
            </div>
      </div>
      <div class="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          {/* Table Header */}
          <thead>
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody class="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id}>
                {/* Iterate over the values of each item */}
                {Object.values(item).map((value, index) => (
                  <td
                    key={index}
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
