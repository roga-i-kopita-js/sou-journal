<script lang='ts'>
  import Card from '@smui/card';
  import type { Representation } from '../stores/types';
  import Button, { Label } from '@smui/button';
  import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';


  export let representation: Representation;
  export let startToUpdate: () => void;
  export let deleteColumn: () => void;
</script>


<div style='margin-bottom: 30px'>
  <Accordion multiple>
    <Panel>
      <Header>
        <div style='display: flex; justify-content: space-between'>
          <h4>{representation.columnName}</h4>

          <div>
            <Button on:click={startToUpdate} style='margin-left: auto'>
              <Label>Изменить</Label>
            </Button>

            <Button on:click={deleteColumn}>
              <Label>X</Label>
            </Button>
          </div>
        </div>
      </Header>

      <Content>
        <div style='padding: 15px;'>
          <div style='display: flex; justify-content: flex-start'>
            <div style='margin-right: 20px; border-right: 1px solid black;'>
              <div>
                {#if (representation.difference)}
                  <h4 style='border-bottom: 1px solid black; font-weight: bold'>{representation.columnName}</h4>
                {/if}
                <p>По списку: <b style='font-weight: bold;'>{representation.result.byList}</b></p>
                <p>Имеет оценку: <b style='font-weight: bold;'>{representation.result.hasReview}</b></p>
                <p>Кол-во "5": <b style='font-weight: bold;'>{representation.result.fiveMarksCount}</b></p>
                <p>Кол-во "4": <b style='font-weight: bold;'>{representation.result.fourMarksCount}</b></p>
                <p>Кол-во "3": <b style='font-weight: bold;'>{representation.result.threeMarksCount}</b></p>
                <p>Кол-во "2": <b style='font-weight: bold;'>{representation.result.twoMarksCount}</b></p>
                <p>Неуспевающие: <b style='font-weight: bold;'>{representation.result.badPerformancePercent} %</b></p>
                <p>Успеваемость: <b style='font-weight: bold;'>{representation.result.positivePerformancePercent} %</b></p>
                <p>Качество знаний: <b style='font-weight: bold;'>{representation.result.perfectPerformancePercent} %</b></p>
                <p>СОУ: <b style='font-weight: bold;'>{representation.result.sou} %</b></p>
                <p>Средняя оценка: <b style='font-weight: bold;'>{representation.result.averageMark} %</b></p>
              </div>

              {#if (representation.difference)}
                <div style='border-top: 1px solid black;'>
                  <h4 style='border-bottom: 1px solid black; font-weight: bold'>{representation.difference.name}</h4>
                  <p>По списку: <b style='font-weight: bold;'>{representation.difference.result.byList}</b></p>
                  <p>Имеет оценку: <b style='font-weight: bold;'>{representation.difference.result.hasReview}</b></p>
                  <p>Кол-во "5": <b style='font-weight: bold;'>{representation.difference.result.fiveMarksCount}</b></p>
                  <p>Кол-во "4": <b style='font-weight: bold;'>{representation.difference.result.fourMarksCount}</b></p>
                  <p>Кол-во "3": <b style='font-weight: bold;'>{representation.difference.result.threeMarksCount}</b></p>
                  <p>Кол-во "2": <b style='font-weight: bold;'>{representation.difference.result.twoMarksCount}</b></p>
                  <p>Неуспевающие: <b style='font-weight: bold;'>{representation.difference.result.badPerformancePercent} %</b></p>
                  <p>Успеваемость: <b style='font-weight: bold;'>{representation.difference.result.positivePerformancePercent} %</b></p>
                  <p>Качество знаний: <b style='font-weight: bold;'>{representation.difference.result.perfectPerformancePercent} %</b></p>
                  <p>СОУ: <b style='font-weight: bold;'>{representation.difference.result.sou} %</b></p>
                  <p>Средняя оценка: <b style='font-weight: bold;'>{representation.difference.result.averageMark} %</b></p>
                </div>
              {/if}

            </div>
            {#if (representation.difference)}
              <div style='margin-right: 20px'>
                <div>
                  <h4 style='border-bottom: 1px solid black; font-weight: bold'>Было: {representation.difference.name}</h4>
                </div>
                <table>
                  <thead>
                  <tr>
                    <td><h5 style='margin: 0; padding-left: 10px;'>Фамилия Имя Отчество</h5></td>
                    <td><h5 style='margin: 0; padding-left: 10px;'>Оценка</h5></td>
                  </tr>
                  </thead>
                  <tbody>
                  {#each representation.difference.table as row, i (row?.name + '' + i)}
                    <tr>
                      <td style='padding-left: 10px'>{row.name}</td>
                      <td style='padding-left: 10px;'>{row.mark || '-'}</td>
                    </tr>
                  {/each}
                  </tbody>
                </table>
              </div>
            {/if}

            <div>
              {#if representation.difference}
                <div>
                  <h4 style='border-bottom: 1px solid black; font-weight: bold'>Cейчас: {representation.columnName}</h4>
                </div>
              {/if}
              <table>
                <thead>
                {#if (representation.difference)}
                  <tr>
                    <td><h5 style='margin: 0; padding-left: 10px;'>Оценка</h5></td>
                    <td><h5 style='margin: 0 ; padding-left: 10px;'>Фамилия Имя Отчество</h5></td>
                  </tr>
                {:else }
                  <tr>
                    <td><h5 style='margin: 0 ; padding-left: 10px;'>Фамилия Имя Отчество</h5></td>
                    <td><h5 style='margin: 0; padding-left: 10px;'>Оценка</h5></td>
                  </tr>
                {/if}
                </thead>
                <tbody>
                {#each representation.table as row, i (row.name + '' + i)}
                  {#if (representation.difference)}
                    <tr>
                      <td style='padding-left: 10px'>{row.mark || '-'}</td>
                      <td style='padding-left: 10px'>{row.name}</td>
                    </tr>
                  {:else }
                    <tr>
                      <td style='padding-left: 10px'>{row.name}</td>
                      <td style='padding-left: 10px'>{row.mark}</td>
                    </tr>
                  {/if}
                {/each}
                </tbody>
              </table>
            </div>
          </div>
          {#if (representation.difference)}
            <div>
              <h4 style='border-bottom: 1px solid black; font-weight: bold'>Вывод</h4>
              <p>
                Подняли отметку - <b style='font-weight: bold;'> {representation.difference.up.count}
                ({representation.difference.up.percent} %)</b>
                <br />
                Понизили отметку - <b style='font-weight: bold;'> {representation.difference.down.count}
                ({representation.difference.down.percent} %)</b>
              </p>
            </div>
          {/if}
        </div>
      </Content>
    </Panel>
  </Accordion>
  <Card>

  </Card>
</div>