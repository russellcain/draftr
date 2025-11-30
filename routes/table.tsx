import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import RedirectButton from "../islands/RedirectButton";
import SearchTable from "../islands/SearchTable";
import { TableData, TableRow } from "../types/table";

export const handler: Handlers<TableData> = {
  async GET(_req: Request, ctx: HandlerContext<TableData>) {
    try {
      const jsonText = await Deno.readTextFile("./data/player-salaries.json");

      const data: TableRow[] = JSON.parse(jsonText);
      const items = data.map((item) => {
        return {
          ...item,
          salary_cap_hit: Number(item.salary_cap_hit)
        }
      })
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
    <div className="p-8 mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-6">
            <div className="w-1/2"> 
                <h1 className="text-3xl font-bold text-left">
                    Players
                </h1>
            </div>
        
            <div className="w-1/2 flex justify-end">
            <RedirectButton href="/" displayText="Return Home" /> 
            </div>
      </div>
        <SearchTable items={items} headers={headers}/>
    </div>
  );
}
