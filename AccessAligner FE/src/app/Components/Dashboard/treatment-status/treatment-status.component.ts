import { Component } from "@angular/core";
import { Chart } from "chart.js";
import { chartColors, randomScalingFactor } from "../Utils";
import color from "@kurkle/color";
import { DashboardService } from "../../../Core/Services/DashboardService/dashboard.service";

@Component({
  selector: "app-treatment-status",
  standalone: true,
  imports: [],
  templateUrl: "./treatment-status.component.html",
  styleUrl: "./treatment-status.component.css",
})
export class TreatmentStatusComponent {
  public chart: any;
  chartColors = chartColors;
  color = "";
  year: any;

  treats$!: number[];
  plans$!: number[];
  constructor(private dashboardService: DashboardService) {
    this.dashboardService.getTreatStatistic$.subscribe((data) => {
      this.treats$ = data;
      this.dashboardService.getTreatStatistic$.subscribe((data) => {
        this.plans$ = data;
        this.createChart();
      });
    });
  }
  /**
   * // Using forkJoin to fetch both treatment and plan statistics at the same time
    forkJoin([
      this.dashboardService.getTreatStatistic$,
      this.dashboardService.getPlanStatistic$,
    ]).subscribe(
      ([treatData, planData]) => {
        // Set data once both streams have emitted
        this.treats$ = treatData;
        this.plans$ = planData;
        // Log data to ensure it's fetched
        console.log("Treatments Data:", this.treats$);
        console.log("Plans Data:", this.plans$);

        // Create the chart after both data sets are fetched
        if (this.treats$.length > 0 && this.plans$.length > 0)
          this.createChart();
      },
      (error) => {
        console.error("Error fetching data:", error);
      }
    );
   */
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.color = chartColors.green;
    this.year = 2024;
    this.dashboardService.getTreatStatisticsYear(this.year);
    this.dashboardService.getPlanStatisticsYear(this.year);
  }

  createChart() {
    // Destroy the previous chart instance if it exists
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart("treat_status_chart", {
      type: "bar",
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
            label: "Treatments",
            data: this.treats$,
            backgroundColor: color(this.color).alpha(0.8).rgbString(),
            borderColor: color(this.chartColors.grey).alpha(0.5).rgbString(), // Border color with transparency
            borderWidth: 1,
          },
          {
            label: "Plans",
            data: this.plans$,
            backgroundColor: color(this.color).alpha(0.4).rgbString(),

            borderColor: color(this.chartColors.grey).alpha(0.5).rgbString(), // Border color with transparency
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true, // Hides the legend
            title: {
              display: true,
              text: "Number of treatments and plans per month on " + this.year,
            },
          },
        },
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
      },
    });
  }

  getYearStatics(year: any, color: any) {
    this.year = year;
    this.color = color;
    this.dashboardService.getTreatStatisticsYear(this.year);
  }
}
