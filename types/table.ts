import { PositionEnum, TeamEnum } from "./nhl";

export interface TableRow {
    team: TeamEnum;
    name: string;
    age: number;
    pos: PositionEnum;
    salary_cap_hit: number;
}

export interface TableData {
    items: TableRow[];
}
