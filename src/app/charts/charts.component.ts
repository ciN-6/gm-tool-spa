import { Component } from '@angular/core';
import { AgChartsAngular } from 'ag-charts-angular';
import {
  AgBarSeriesOptions,
  AgChartOptions,
  AgCharts,
} from "ag-charts-community";

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [AgChartsAngular],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})
export class ChartsComponent {

  // Chart Options
  public chartOptions: AgChartOptions;

  constructor() {
    this.chartOptions = {
      // Data: Data to be displayed in the chart
      data: [
        { month: 'Jan', avgTemp: 2.3, iceCreamSales:  162000/3668000  },
        { month: 'Mar', avgTemp: 6.3, iceCreamSales:  302000/3668000   },
        { month: 'May', avgTemp: 16.2, iceCreamSales: 800000/3668000  },
        { month: 'Jul', avgTemp: 22.8, iceCreamSales: 1254000/3668000 },
        { month: 'Sep', avgTemp: 14.5, iceCreamSales: 950000/3668000  },
        { month: 'Nov', avgTemp: 8.9, iceCreamSales:  200000/3668000   },
      ],
      // Series: Defines which chart type and data to use
      series: [
        {
          type: 'donut',
          calloutLabelKey: 'month',
          angleKey: 'iceCreamSales',
          outerRadiusRatio: 1,
          innerRadiusRatio: 0.7,
        },
        {
          type: 'donut',
          calloutLabelKey: 'month',
          angleKey: 'avgTemp',
          outerRadiusRatio: 0.6,
          innerRadiusRatio: 0.2,
        }
      ]
    };
  }
}