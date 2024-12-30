import type { Readable, Writable } from 'svelte/types/runtime/store';

export type ColumnResult = {
  hasReview: number;
  byList: number;
  fiveMarksCount: number;
  fourMarksCount: number;
  threeMarksCount: number;
  twoMarksCount: number;
  averageMark: number;
  badPerformancePercent: number;
  positivePerformancePercent: number;
  perfectPerformancePercent: number;
  sou: number;
};

export type TableData = {
  table: Array<{ name: string; mark: number }>;
  currentColumn: Column;
};

export type Diff =
  | {
      up: { count: number; percent: number };
      down: { count: number; percent: number };
      name: string;
      table: TableData['table'];
      result: ColumnResult;
    }
  | undefined;

export type Column = {
  name: string;
  id: string;
  values: Array<string | number>;
};

export type Td = {
  columnId: number;
  value: string | number;
};

export type Table = {
  id: string;
  columns: Array<Column>;
};

export type Tables = Array<Table>;

export type List = {
  tables: Tables;
  isCreate?: boolean;
  updatedTableId?: string;
};

export type ColumnId = string;

export type ColumnIds = Array<ColumnRepresentation>;

export type Representation = {
  id: ColumnId;
  name: string;
  result: ColumnResult;
  columnName: string;
  table: TableData['table'];
  difference?: Diff;
};

export type ColumnRepresentation = {
  main: ColumnId;
  diff?: ColumnId;
};

export type RepresentationArray = Array<Representation>;

export interface ListStore {
  subscribe: Readable<List>['subscribe'];

  addNewTable(text: string, fileName: string): void;

  createTable(txt: string, name: string): void;

  removeTable(id: string): void;

  updateTable(txt: string, name: string, prevId: string): void;

  startToCreateTable(): void;

  startToUpdateTable(updatedTableId: string): void;

  goBack(): void;
}

export interface SingleColumnStore {
  subscribe: Readable<ColumnIds>['subscribe'];

  addColumn(column: ColumnRepresentation): void;

  deleteColumn(index: number): void;

  updateColumn(index: number, column: ColumnRepresentation): void;

  removeUnusedColumns(columnId: ColumnId): void;

  addDifferenceColumn(id: ColumnId, diff: ColumnId): void;

  clear(): void;
}

export type ChartItem = {
  group: string;
  key: string;
  value: number;
};

export type Chart = {
  name: string;
  items: Array<ChartItem>;
};

export interface ChartsStore {
  subscribe: Writable<Array<Chart>>['subscribe'];

  addNewChart(): void;

  deleteChart(index: number): void;

  updateChart(index: number, chart: Chart): void;

  clear(): void;
}
