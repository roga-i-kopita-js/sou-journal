<script lang='ts'>
  import { LineChart } from '@carbon/charts-svelte';
</script>

<LineChart
  data={[
	{
		"group": "I четверть",
		"key": "5а",
		"value": 34
	},
	{
		"group": "I четверть",
		"key": "5б",
		"value": 23
	},
	{
		"group": "I четверть",
		"key": "7а",
		"value": 95
	},
	{
		"group": "I четверть",
		"key": "7б",
		"value": 42
	},
	{
		"group": "I четверть",
		"key": "8а",
		"value": 12
	}
]}
  options={{
	"title": "СОУ грфик",
	"axes": {
		"bottom": {
			"title": "Классы",
			"mapsTo": "key",
			//@ts-ignore
			"scaleType": "labels"
		},
		"left": {
      "title": "СОУ",
			"mapsTo": "value",
      //@ts-ignore
			"scaleType": "linear"
		}
	},
	"height": "400px"
}}
/>
