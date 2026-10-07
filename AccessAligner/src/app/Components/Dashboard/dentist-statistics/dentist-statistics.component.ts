import { Component } from "@angular/core";
import { Chart } from "chart.js";
import color from "@kurkle/color";
import { chartColors, randomScalingFactor } from "../Utils";

@Component({
  selector: "app-dentist-statistics",
  standalone: true,
  imports: [],
  templateUrl: "./dentist-statistics.component.html",
  styleUrl: "./dentist-statistics.component.css",
})
export class DentistStatisticsComponent {
  public chart: any;
  chartColors = chartColors;
  labels = [
    { title: "CONFIRMED", color: "" },
    { title: "CANCELED", color: "" },
    { title: "WAIT", color: "" },
    { title: "ACCEPTED", color: "" },
    { title: "REJECTED", color: "" },
    { title: "BLOCKED", color: "" },
  ];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.createChart();
    this.createPieChart();
  }

  createPieChart() {
    this.chart = new Chart("sparkline-pie", {
      type: "doughnut",
      options: {
        cutout: 1,
        offset: 1,
        // radius: "70%",
        responsive: true,
        plugins: {
          legend: {
            position: "right",
          },
          title: {
            display: true,
            text: "The percentage of dentists with their status",
          },
        },
        animation: {
          animateRotate: true,
          animateScale: true,
        },
        //startAngle: 0, // Start angle of the chart (optional)      },
      },
      data: {
        labels: [
          "CONFIRMED",
          "CANCELED",
          "WAIT",
          "ACCEPTED",
          "REJECTED",
          "BLOCKED",
        ],
        datasets: [
          {
            label: "My First Dataset",
            data: [
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
            ],
            backgroundColor: [
              color(this.chartColors.red).alpha(0.5).rgbString(),
              color(this.chartColors.orange).alpha(0.5).rgbString(),
              color(this.chartColors.yellow).alpha(0.5).rgbString(),
              color(this.chartColors.green).alpha(0.5).rgbString(),
              color(this.chartColors.blue).alpha(0.5).rgbString(),
              color(this.chartColors.purple).alpha(0.5).rgbString(),
            ],
            hoverOffset: 4,
          },
        ],
      },
    });
  }

  createChart() {
    // Destroy the previous chart instance if it exists
    /*  if (this.chart) {
          this.chart.destroy();
        } */

    this.chart = new Chart("polar-chart-area", {
      type: "polarArea",
      options: {
        responsive: true,

        plugins: {
          legend: {
            position: "left",
          },

          title: {
            display: true,
            text: "The number of dentists and their status",
          },
        },
        animation: {
          animateRotate: true,
          animateScale: true,
        },
        startAngle: 0, // Start angle of the chart (optional)
      },
      data: {
        datasets: [
          {
            data: [
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
            ],
            backgroundColor: [
              color(this.chartColors.red).alpha(0.5).rgbString(),
              color(this.chartColors.orange).alpha(0.5).rgbString(),
              color(this.chartColors.yellow).alpha(0.5).rgbString(),
              color(this.chartColors.green).alpha(0.5).rgbString(),
              color(this.chartColors.blue).alpha(0.5).rgbString(),
              color(this.chartColors.purple).alpha(0.5).rgbString(),
            ],
            label: "My dataset", // for legend
          },
        ],
        labels: [
          "CONFIRMED",
          "CANCELED",
          "WAIT",
          "ACCEPTED",
          "REJECTED",
          "BLOCKED",
        ],
      },
    });
  }
}
