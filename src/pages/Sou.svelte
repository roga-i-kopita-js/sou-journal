<script lang='ts'>
  import AddColumn from '../components/AddColumn.svelte';
  import { columnRepresentations } from '../stores/ColumnRepresentation';
  import { singleColumn } from '../stores/SingleColumn';
  import { listStore } from '../stores/List';
  import Button from '@smui/button';
  import Representation from '../components/Representation.svelte';

  let action: 'add' | 'preview' = 'preview';
  let updatedIndex: number;
  $:updatedColumnId = {
    main: $singleColumn[updatedIndex]?.main,
    diff: $singleColumn[updatedIndex]?.diff,
  };
  const changeAction = (type: 'add' | 'preview'): void => {
    if (type === 'preview') {
      updatedIndex = undefined;
    }
    action = type;
  };
  const startToUpdate = (index: number): void => {
    updatedIndex = index;
    changeAction('add');
  };

  $:isAdd = action === 'add';
  $:isPreview = action === 'preview';
</script>

<div>
  <div
    style='padding-bottom: 15px; padding-top: 15px; margin-bottom: 30px; border-bottom: 1px solid rgba(98, 0, 238, 0.87); display: flex;'>
    {#if ($singleColumn.length) && isAdd}
      <div style='margin-right: 20px'>
        <Button on:click={() => changeAction('preview')}>
          Назад
        </Button>
      </div>
    {/if}
    {#if ($listStore.tables.length && isPreview)}
      <Button on:click={() => changeAction('add')}>
        Добавить
      </Button>
    {/if}
    {#if (isPreview && $singleColumn.length)}
      <div style='margin-left: auto'>
        <Button on:click={singleColumn.clear}>
          Очистить рабочую область
        </Button>
      </div>
    {/if}
  </div>
  {#if isAdd || !$singleColumn.length}
    <AddColumn back={() =>  changeAction('preview')} columnId={updatedColumnId}
               onSave={(columnId, diff) => {
                 if (updatedColumnId.main || updatedColumnId.diff) {
                  singleColumn.updateColumn(updatedIndex, {main: columnId, diff})
                 } else {
                  singleColumn.addColumn({main: columnId, diff});
                 }
                changeAction('preview');
               }} />
  {/if}
  {#if isPreview}
    {#each $columnRepresentations as representation, i (representation.id + '' + i)}
      <Representation representation={representation}
                      startToUpdate={() => startToUpdate(i)}
                      deleteColumn={() => singleColumn.deleteColumn(i)} />
    {/each}
  {/if}
</div>