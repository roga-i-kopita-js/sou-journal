import type { ColumnIds } from './stores/types';

export const setSingleColumns = (columns: ColumnIds): void => {
  localStorage.setItem('singleColumns', JSON.stringify(columns));
};

export const getSingleColumns = (): ColumnIds => {
  const columns = localStorage.getItem('singleColumns');
  return JSON.parse(columns || '[]');
};

export const clearSingleColumns = (): void => {
  localStorage.removeItem('singleColumns');
};
