<script lang='ts'>
  import { listColumns } from '../stores/ListColumns';
  import Button, { Label } from '@smui/button';
  import type { Column, ColumnId } from '../stores/types';
  import Select, { Option } from '@smui/select';

  export let back: () => void;
  export let onSave: (id: ColumnId, diff?: ColumnId) => void;
  export let columnId: { main: ColumnId; diff?: ColumnId } | undefined;

  let value: Column | undefined = $listColumns.find(v => v.id === columnId?.main);
  let diffValue: Column | undefined = $listColumns.find(v => v.id === columnId?.diff);

  $:options = $listColumns.filter(v => {
    if (v.name.includes('Фамилия Имя Отчество')) {
      return false;
    }
    if (diffValue) {
      return diffValue.name !== v.name;
    }
    return true;
  });

  $:diffOptions = $listColumns.filter(v => {
    if (v.name.includes('Фамилия Имя Отчество')) {
      return false;
    }
    if (value) {
      return value.name !== v.name;
    }
    return true;
  });

  const save = (): void => {
    if (value?.id) {
      onSave(value.id, diffValue?.id);
      back();
    } else {
      alert('Необходимо выбрать основную колонку перед тем как ее добалять!');
    }
  };

</script>

<div>
  <div style='margin-bottom: 20px'>
    <Select
      variant='outlined'
      key={(column) => `${(column && column.id) || ''}`}
      bind:value={value}
      label='Основная колонка'
    >
      {#each options as option (option.name)}
        <Option value={option}>{option.name}</Option>
      {/each}
    </Select>

    <Select
      variant='outlined'
      key={(column) => `${(column && column.id) || ''}`}
      bind:value={diffValue}
      label='Сравниваемая колонка (Не обязательно)'
    >
      <Option value={undefined}/>
      {#each diffOptions as option (option.name)}
        <Option value={option}>{option.name}</Option>
      {/each}
    </Select>
  </div>

  <Button on:click={save}>
    <Label>Сохранить</Label>
  </Button>
</div>

