import { Component } from "@angular/core";
import color from "@kurkle/color";
import { Chart } from "chart.js";
import { chartColors, randomScalingFactor } from "../Utils";

@Component({
  selector: "app-dentist-activity",
  standalone: true,
  imports: [],
  templateUrl: "./dentist-activity.component.html",
  styleUrl: "./dentist-activity.component.css",
})
export class DentistActivityComponent {
  public chart: any;
  chartColors = chartColors;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.createChart();
  }

  createChart() {
    this.chart = new Chart("tooltip-canvas", {
      type: "doughnut",

      data: {
        labels: ["Active", "Passive", "Suspended"],
        datasets: [
          {
            label: "My First Dataset",
            data: [
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
            ],
            backgroundColor: [
              color(this.chartColors.green).alpha(0.5).rgbString(),
              color(this.chartColors.orange).alpha(0.5).rgbString(),
              color(this.chartColors.yellow).alpha(0.5).rgbString(),
            ],
            hoverOffset: 2,
          },
        ],
      },
      options: { cutout: 100 },
    });
  }
}
