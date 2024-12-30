import type { Tables } from './stores/types';

export const updateTables = (tables: Tables) => {
  localStorage.setItem('tables', JSON.stringify(tables));
};

export const removeTables = () => {
  localStorage.removeItem('tables');
};

export const getTables = (): Tables => {
  const tables = localStorage.getItem('tables');
  return tables ? JSON.parse(tables) : [];
};
