import { derived } from 'svelte/store';
import { listColumns } from './ListColumns';
import { singleColumn } from './SingleColumn';
import type {
  ColumnResult,
  Diff,
  TableData,
  Column,
  ColumnId,
  RepresentationArray,
} from './types';

const calculatePercent = (total: number, count: number): number => {
  if (count === 0) {
    return 0;
  }
  const res = ((count * 100) / total).toFixed(2);
  return res ? parseFloat(res) : 0;
};

const calculateResult = (column: Column): ColumnResult => {
  const values = column.values;
  const byList = values.length;

  let hasReview = 0;
  let fiveMarksCount = 0;
  let fourMarksCount = 0;
  let threeMarksCount = 0;
  let twoMarksCount = 0;
  values.forEach((value) => {
    if (typeof value === 'number') {
      hasReview += 1;
    }
    if (value === 5) {
      fiveMarksCount += 1;
    }
    if (value === 4) {
      fourMarksCount += 1;
    }
    if (value === 3) {
      threeMarksCount += 1;
    }
    if (value === 2) {
      twoMarksCount += 1;
    }
  });

  const badPerformanceCount = twoMarksCount;
  const perfectPerformanceCount = fourMarksCount + fiveMarksCount;
  const positivePerformanceCount = perfectPerformanceCount + threeMarksCount;

  const badPerformancePercent = calculatePercent(
    hasReview,
    badPerformanceCount,
  );
  const perfectPerformancePercent = calculatePercent(
    hasReview,
    perfectPerformanceCount,
  );
  const positivePerformancePercent = calculatePercent(
    hasReview,
    positivePerformanceCount,
  );
  const sou = parseFloat(
    (
      (fiveMarksCount * 100 +
        fourMarksCount * 64 +
        threeMarksCount * 36 +
        twoMarksCount * 16) /
      hasReview
    ).toFixed(2),
  );
  const averageMark = parseFloat(
    (
      (fiveMarksCount * 5 +
        fourMarksCount * 4 +
        threeMarksCount * 3 +
        twoMarksCount * 2) /
      hasReview
    ).toFixed(2),
  );

  return {
    hasReview,
    byList,
    fiveMarksCount,
    fourMarksCount,
    threeMarksCount,
    twoMarksCount,
    badPerformancePercent: isNaN(badPerformancePercent)
      ? 0
      : badPerformancePercent,
    positivePerformancePercent: isNaN(positivePerformancePercent)
      ? 0
      : positivePerformancePercent,
    perfectPerformancePercent: isNaN(perfectPerformancePercent)
      ? 0
      : perfectPerformancePercent,
    sou: isNaN(sou) ? 0 : sou,
    averageMark: isNaN(averageMark) ? 0 : averageMark,
  };
};

const getTable = (
  columnsFromList: Array<Column>,
  columnId: ColumnId,
): TableData => {
  const currentColumn = columnsFromList.find(
    (initialColumn) => initialColumn.id === columnId,
  );
  if (!currentColumn) {
    throw new Error('invalid column id');
  }
  const columnWithName = columnsFromList.find(
    (v) => v.name === `Фамилия Имя Отчество (${columnId.split('/')[0]})`,
  );
  const table = columnWithName?.values?.map((value, index) => ({
    name: value.toString(),
    mark: parseInt(currentColumn.values[index] + '') || 0,
  }));
  return {
    table,
    currentColumn,
  };
};

const getDifference = (
  columnsFromList: Array<Column>,
  prevTable: TableData['table'],
  columnId?: ColumnId,
): Diff => {
  if (!columnId) {
    return undefined;
  }
  const { table, currentColumn } = getTable(columnsFromList, columnId);
  let upCount = 0;
  let downCount = 0;
  table.forEach((v, i) => {
    const priorityMark = prevTable[i]?.mark;
    if (v.mark > priorityMark && v.mark !== 0 && priorityMark !== 0) {
      downCount += 1;
    }
    if (v.mark < priorityMark && v.mark !== 0 && priorityMark !== 0) {
      upCount += 1;
    }
  });
  return {
    up: {
      count: upCount,
      percent: calculatePercent(table.length, upCount),
    },
    down: {
      count: downCount,
      percent: calculatePercent(table.length, downCount),
    },
    name: currentColumn.name,
    result: calculateResult(currentColumn),
    table: table,
  };
};

export const columnRepresentations = derived(
  [singleColumn, listColumns],
  ([$singleColumn, $listColumns]): RepresentationArray => {
    return $listColumns.length
      ? $singleColumn.map((column) => {
          const { table, currentColumn } = getTable($listColumns, column.main);
          const difference = getDifference($listColumns, table, column.diff);

          return {
            id: currentColumn.id,
            name: `${currentColumn.name} ${
              difference ? ' - ' + difference.name : ''
            } `,
            columnName: currentColumn.name,
            result: calculateResult(currentColumn),
            table,
            difference,
          };
        })
      : [];
  },
);
