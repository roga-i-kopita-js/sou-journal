import { writable } from 'svelte/store';
import { getTables, updateTables } from '../listStorage';
import { singleColumn } from './SingleColumn';
import type { List, ListStore, Table, Td } from './types';

const parser = new DOMParser();

function DOMRegex(
  dom: Document,
  regex: RegExp,
  attribute?: string,
): Array<Element> {
  const attr = attribute ?? 'id';
  const output: Array<Element> = [];
  const allNodes = dom.querySelectorAll('*');
  for (let i of allNodes) {
    if (regex.test(i[attr])) {
      // or whatever attribute you want to search
      output.push(i);
    }
  }
  return output;
}

const blackListOfColumnNames = [
  'Наименование',
  'Преподаватель',
  'Кабинет',
  'Класс',
  'Предмет',
  'Тип оценивания',
  'Открыть доступ для учителей',
  'Порядок вывода',
];
const parseDataFromBlob = (txt: string): Table => {
  const htmlDoc = parser.parseFromString(txt, 'text/html');
  const tds: Array<Td> = DOMRegex(
    htmlDoc,
    /x-grid-cell-gridcolumn-\d+/,
    'className',
  ).map((td) => {
    const value = td.children[0]?.textContent || '';
    let columnId = 0;
    for (let i = 0; i < td.classList.length; i++) {
      if (/x-grid-cell-gridcolumn-\d+/.test(td.classList[i])) {
        const match = td.classList[i].match(/\d+/g);
        columnId = parseFloat(match[0]);
        break;
      }
    }
    const numberValue = parseFloat(value);
    return {
      columnId,
      value: isNaN(numberValue) ? value : numberValue,
    };
  });
  const columns = DOMRegex(htmlDoc, /gridcolumn.*textEl/gm)
    .map((column) => {
      const match = column.id.match(/\d+/g);
      const id = parseFloat(match[0]);
      const currentTds = tds.filter((v) => v.columnId === id);
      return {
        id: match[0],
        name: column.textContent,
        values: Array.from(currentTds, (v) => v.value).filter((v) => v),
      };
    })
    .filter((v) => !blackListOfColumnNames.includes(v.name));

  return {
    id: htmlDoc.getElementById('journal_header_hd-textEl')?.textContent,
    columns,
  };
};

function createList(): ListStore {
  const { subscribe, update } = writable<List>({
    tables: getTables(),
  });

  return {
    subscribe,
    createTable() {
      update((self) => ({ ...self, currentTableId: 'new' }));
    },
    removeTable(id) {
      const shure = confirm('Вы действительно хотите удалить эту таблицу?');
      if (shure) {
        singleColumn.removeUnusedColumns(id);
        update((self) => {
          const tables = self.tables.filter((v) => v.id !== id);
          updateTables(tables);
          return {
            tables,
          };
        });
      }
    },
    updateTable(txt, name, prevId) {
      const updatedTable = parseDataFromBlob(txt);
      update((self) => {
        const tables = self.tables.map((table) =>
          table.id === prevId
            ? {
                ...updatedTable,
                id: name,
              }
            : table,
        );
        updateTables(tables);
        return {
          tables,
        };
      });
    },
    addNewTable(text, name) {
      update((self) => {
        const table = parseDataFromBlob(text);
        table.id = name;
        const existIndex = self.tables.findIndex((t) => t.id === table.id);
        const isExist = existIndex !== -1;
        let tables = [...self.tables];
        if (isExist) {
          const isConform = confirm('Такая таблица уже сществует! Обновить?');
          if (isConform) {
            tables[existIndex] = table;
          }
        } else {
          tables = [...self.tables, table];
        }
        updateTables(tables);
        return {
          ...self,
          tables,
          isCreate: false,
        };
      });
    },
    startToCreateTable() {
      update((self) => ({ ...self, isCreate: true }));
    },
    startToUpdateTable(updatedTableId) {
      update((self) => ({ ...self, updatedTableId, isCreate: false }));
    },
    goBack() {
      update((self) => ({ tables: self.tables }));
    },
  };
}

export const listStore = createList();
