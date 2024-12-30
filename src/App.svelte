<script lang='ts'>
  import "@carbon/styles/css/styles.css";
  import "@carbon/charts/styles.css";
  import Home from './pages/Home.svelte';
  import Sou from './pages/Sou.svelte';
  import Drawer, { AppContent, Content } from '@smui/drawer';
  import List, { Item, Text } from '@smui/list';
  import { listStore } from './stores/List';
  import type { List as TList } from './stores/types';

  enum Pages {
    sou = 'sou',
    tables = 'tables',
    chart = 'chart'
  }

  let page = localStorage.getItem('page') || Pages.tables;

  $:tables = ($listStore as TList).tables;

  const goToHome = (): void => {
    page = Pages.tables;
    localStorage.setItem('page', Pages.tables);
  };

  const gotToSou = (): void => {
    if (tables.length > 0) {
      page = Pages.sou;
      localStorage.setItem('page', Pages.sou);
    }
  };

  const goToChart = (): void => {
    if (tables.length > 0) {
      page = Pages.chart;
      localStorage.setItem('page', Pages.chart);
    }
  };

  $:isHome = page === Pages.tables || tables.length === 0;
  $:isSou = page === Pages.sou && tables.length > 0;
  $:isChart = page === Pages.chart && tables.length > 0;
  let open = true;
</script>

<div class='drawer-container'>
  <Drawer variant='dismissible' bind:open>
    <Content>
      <List>
        <Item
          activated={isHome}
          on:click={goToHome}
        >
          <Text>Таблицы</Text>
        </Item>
        <Item
          activated={isSou}
          on:click={gotToSou}
        >
          <Text>Калькулятор</Text>
        </Item>
      </List>
    </Content>
  </Drawer>

  <AppContent class='app-content'>
    <main class='main-content'>
      {#if isHome}
        <Home />
      {:else if isSou}
        <Sou />
      {/if}
    </main>
  </AppContent>
</div>

<style>
    /* These classes are only needed because the
      drawer is in a container on the page. */
    .drawer-container {
        position: relative;
        display: flex;
        height: 350px;
        max-width: 600px;
        border: 1px solid;
        overflow: hidden;
        z-index: 0;
        justify-content: space-between;
    }

    * :global(.app-content) {
        flex: auto;
        overflow: auto;
        position: relative;
        flex-grow: 1;
    }

    .main-content {
        overflow: auto;
        padding: 16px;
        height: 100%;
        box-sizing: border-box;
    }
</style>