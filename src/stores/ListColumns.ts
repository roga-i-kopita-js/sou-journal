import { derived } from 'svelte/store';
import { listStore } from './List';
import type { Column } from './types';

export const listColumns = derived(listStore, ($listStore): Array<Column> => {
  return $listStore.tables.reduce<Array<Column>>((accum, value) => {
    const columns = value.columns.map((column) => ({
      ...column,
      id: `${value.id}/${column.id}`,
      name: `${column.name} (${value.id})`,
    }));
    return [...accum, ...columns];
  }, []);
});
