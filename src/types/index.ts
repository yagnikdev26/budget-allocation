export interface DataRow {
  id: string;
  label: string;
  value: number;
  originalValue: number;
  children?: DataRow[];
}

export interface TableData {
  rows: DataRow[];
}