import type { Chart, ChartsStore } from './types';
import { writable } from 'svelte/store';

const getChartsFromStorage = (): Array<Chart> => {
  const charts = localStorage.getItem('charts');
  return JSON.parse(charts);
};

const setChartsToStorage = (charts: Array<Chart>): void => {
  localStorage.setItem('charts', JSON.stringify(charts));
};

function createCharts(): ChartsStore {
  const { subscribe, update } = writable<Array<Chart>>(getChartsFromStorage());

  return {
    subscribe,
    addNewChart() {},
    clear(): void {
      //
    },
    deleteChart(index: number): void {
      //
    },
    updateChart(index: number, chart: Chart): void {
      //
    },
  };
}

export const Charts = createCharts();
