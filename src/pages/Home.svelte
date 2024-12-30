<script>
  import Card from '@smui/card';
  import Button, { Label } from '@smui/button';
  import { listStore } from '../stores/List';
  import Upload from '../components/Upload.svelte';


  $:isCreateOrUpdateAction = $listStore.isCreate || typeof $listStore.updatedTableId === 'string' || $listStore.tables.length === 0;
</script>

<div>
  {#if ($listStore.tables.length > 0) }
    <div
      style='padding-bottom: 15px; padding-top: 15px; margin-bottom: 30px; border-bottom: 1px solid rgba(98, 0, 238, 0.87); display: flex;'>
      {#if isCreateOrUpdateAction}
        <Button on:click={listStore.goBack}>
          <Label>
            Назад
          </Label>
        </Button>
      {:else}
        <Button on:click={listStore.startToCreateTable}>
          <Label>
            Добавить таблицу
          </Label>
        </Button>
      {/if}
    </div>
  {/if}

  {#if isCreateOrUpdateAction}
    <Upload />
  {:else}
    <div>
      {#each $listStore.tables as table, i (table.id + '' + i)}
        <div style='margin-bottom: 30px'>
          <Card>
            <div style='display: flex; padding: 20px; justify-content: space-between'>
              <p on:click={() => listStore.startToUpdateTable(table.id)}
                 style='cursor: pointer; width: 100%; display: flex; color: #6e21e8'>
                <b>{table.id}</b>
              </p>
              <Button on:click={() => listStore.removeTable(table.id)}>
                <Label>X</Label>
              </Button>
            </div>
          </Card>
        </div>
      {/each}
    </div>
  {/if}
</div>