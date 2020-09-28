import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Events } from '@ionic/angular';
import { NativeService } from 'src/app/providers/NativeService';
import { Helper } from 'src/app/providers/Helper';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.page.html',
  styleUrls: ['./trip.page.scss'],
})
export class TripPage implements OnInit {

  constructor(
    public router: Router) { }

  ngOnInit() {
  }

  test() {
    this.router.navigate(['/tabs/trip/test'], { queryParams: { page: 1, size: 10 } });
  }
}
