import { Component } from "@angular/core";
import Chart from "chart.js/auto";
import { chartColors, randomScalingFactor } from "../Utils";
import { DashboardService } from "../../../Core/Services/DashboardService/dashboard.service";

@Component({
  selector: "app-treatment-statistics",
  standalone: true,
  imports: [],
  templateUrl: "./treatment-statistics.component.html",
  styleUrl: "./treatment-statistics.component.css",
})
export class TreatmentStatisticsComponent {
  public chart: any;
  chartColors = chartColors;
  color = "";
  year: any;
  treats$!: number[];
  constructor(private dashboardService: DashboardService) {
    this.dashboardService.getTreatStatistic$.subscribe((data) => {
      this.treats$ = data;
      this.createChart();
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.color = chartColors.blue;
    this.year = 2024;
    this.dashboardService.getTreatStatisticsYear(this.year);

    // this.createChart();
  }

  createChart() {
    // Destroy the previous chart instance if it exists
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart("m_area_chart", {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "augest",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            fill: false,
            label: "My First dataset",
            data: this.treats$,
            borderColor: this.color,
            backgroundColor: this.color,
            pointBorderColor: this.color,
            pointBackgroundColor: this.color,
            pointBorderWidth: 2,
            tension: 0.4,
            spanGaps: false,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            grid: {
              display: false, // Hides grid lines for the x-axis
            },
          },
          y: {
            beginAtZero: true, // Ensures y-axis starts at zero
          },
        },
        /*  scales: {
          x: {
            grid: {
              display: false, // Disable grid lines for the x-axis
            },
          },
          y: {
            stacked: false,
            ticks: {
              stepSize: 100, // Adjust this value to set the increment for y-axis steps
            },
          },
        }, */
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: "Number of teatments per month on  " + this.year,
          },
        },
      },
    });
  }
  getYearStatics(year: any, color: any) {
    this.year = year;
    this.color = color;
    this.dashboardService.getTreatStatisticsYear(this.year);
  }
}
