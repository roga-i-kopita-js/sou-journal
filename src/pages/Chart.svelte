<script lang='ts'>
  import CustomChart from '../components/CustomChart.svelte';
  import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
</script>


<div class="accordion-container">
  <Accordion multiple>
    <Panel>
      <Header>Custom chart 1</Header>
      <Content>
        <CustomChart/>
      </Content>
    </Panel>
  </Accordion>
</div>
