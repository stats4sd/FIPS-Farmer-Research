import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DatabaseProvider} from '../../../providers/providers';
import * as Chart from 'chart.js'

@IonicPage()
@Component({
  selector: 'page-experiment-results',
  templateUrl: 'experiment-results.html',
})
export class ExperimentResultsPage {
  insights:any
  canvas: any;
  ctx: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public databasePrvdr:DatabaseProvider) {
    this.databasePrvdr.getCollection('Surveys')
  }

  ionViewDidLoad() {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: ["New", "In Progress", "On Hold"],
        datasets: [{
          label: '# of Votes',
          data: [1, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: false,
        display: true
      }
    });
  }
}