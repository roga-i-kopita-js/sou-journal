import { writable } from 'svelte/store';
import {
  clearSingleColumns,
  getSingleColumns,
  setSingleColumns,
} from '../singleColumnStorage';
import type { ColumnIds, SingleColumnStore } from './types';

const createColumnsStore = (): SingleColumnStore => {
  const { subscribe, update, set } = writable<ColumnIds>(getSingleColumns());

  return {
    subscribe,
    addColumn({ main, diff }) {
      update((self) => {
        const isExist = self.some((v) => v.main === main && v.diff === diff);
        const columns = isExist
          ? [...self]
          : [
              ...self,
              {
                main,
                diff,
              },
            ];

        setSingleColumns(columns);
        return columns;
      });
    },
    deleteColumn(index) {
      update((self) => {
        const columns = [...self];
        const sure = confirm('Вы уверены?');
        if (sure) {
          columns.splice(index, 1);
          setSingleColumns(columns);
        }
        return columns;
      });
    },
    removeUnusedColumns(columnId) {
      update((self) => {
        const regEx = new RegExp(columnId);
        const columns = self.filter((v) => {
          if (regEx.test(v.main)) {
            return false;
          }
          return !regEx.test(v.diff);
        });
        setSingleColumns(columns);
        return columns;
      });
    },
    updateColumn(index, { main, diff }) {
      update((self) => {
        const columns = [...self];
        columns[index] = { main, diff };
        setSingleColumns(columns);
        return columns;
      });
    },
    addDifferenceColumn(id, diff) {
      update((self) => {
        const columns = self.map((v) => (v.main === id ? { ...v, diff } : v));
        setSingleColumns(columns);
        return columns;
      });
    },
    clear() {
      const sure = confirm('Вы уверены?');
      if (sure) {
        clearSingleColumns();
        set([]);
      }
    },
  };
};

export const singleColumn = createColumnsStore();
