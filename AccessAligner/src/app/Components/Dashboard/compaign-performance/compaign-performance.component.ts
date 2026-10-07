import { Component } from "@angular/core";
import { Chart } from "chart.js";

@Component({
  selector: "app-compaign-performance",
  standalone: true,
  imports: [],
  templateUrl: "./compaign-performance.component.html",
  styleUrl: "./compaign-performance.component.css",
})
export class CompaignPerformanceComponent {
  public chart: any;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.createChart();
  }

  createChart() {
    this.chart = new Chart("sparkline-pie", {
      type: "doughnut",
      options: { cutout: 1 },

      data: {
        labels: ["PDF", "IMAGES", "VIDEOS", "SCANS"],
        datasets: [
          {
            label: "My First Dataset",
            data: [300, 50, 100, 60],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(54, 162, 100)",
              "rgb(255, 205, 86)",
            ],
            hoverOffset: 4,
          },
        ],
      },
    });
  }
}
