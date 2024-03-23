import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AgChartsAngular } from 'ag-charts-angular';
import {
  AgBarSeriesOptions,
  AgChartOptions,
  AgCharts,
} from "ag-charts-community";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [AgChartsAngular],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})
export class ChartsComponent implements OnChanges {

  // Chart Options
  public chartOptions: AgChartOptions;
  @Input()
  data:[]=[];

  constructor() {
    // this.data.subscribe(val => {
    //   console.log("reshreshed")
    //   this.recalculate(val)
    // });

    this.chartOptions = {
      background: { fill: "gray" },
      // Data: Data to be displayed in the chart
      // data: this.data,
      // Series: Defines which chart type and data to use
      series: [
        {
          type: 'pie',
          calloutLabelKey: 'value',
          angleKey: 'valueRolled'
        }
      ]
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    let obs:Observable<any> = changes['data'].currentValue;
    obs.subscribe(x=>{
      this.recalculate(x)})
  }

  recalculate(data: any): void {
    this.chartOptions = {
      background: { fill: "gray" },
      // Data: Data to be displayed in the chart
      data: data,
      // Series: Defines which chart type and data to use
      series: [
        {
          type: 'pie',
          calloutLabelKey: 'timeRolled',
          angleKey: 'timeRolled',
          legendItemKey: "value"
        }
      ]
    };
  }

}