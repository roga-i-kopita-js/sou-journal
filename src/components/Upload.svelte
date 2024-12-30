<script lang='ts'>
  import { listStore } from '../stores/List';
  import type { List } from '../stores/types';

   $:updatedTableId = ($listStore as List).updatedTableId;

  const getHtmlContent = (e: CustomEvent & { currentTarget: EventTarget & HTMLInputElement; }): void => {
    const reader = new FileReader();
    //@ts-ignore
    const file = e.target.files[0]
    reader.readAsText(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        if (updatedTableId) {
          listStore.updateTable(reader.result, file.name, updatedTableId)
        } else {
          listStore.addNewTable(reader.result, file.name)
        }
      }
    };
    reader.onerror = () => {
      throw new Error('Cannot read this file');
    };
  };

</script>

<div>
  <input type='file' accept='text/html'
         on:change={getHtmlContent}>
</div>