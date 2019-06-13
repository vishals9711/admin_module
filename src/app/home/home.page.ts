import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantDetailsService } from '../Services/restaurant-details.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{


  passed_id: string;
  RestaurantData: any;
  name: any;
  address: any;
  cuisine: any;
  img: any;
  rating: any;
  id: any;

  //for bestsellers tab in html
  sliderOpts = {
    zoom: false,
    slidesPerView: 1.5,
    centeredSlides: true,
    spaceBetween: 10

  }

  constructor(public storage: Storage,private activatedRoute: ActivatedRoute, public restaurantAPI: RestaurantDetailsService,
    public router: Router) {
    console.log('home page: isLoggedIn', this.storage.get('isLoggedIn'));
  }

  ngOnInit(){
    this.passed_id = this.activatedRoute.snapshot.paramMap.get('r_id');


    this.restaurantAPI.getRestaurant(this.passed_id).subscribe((data: {}) => {
      this.RestaurantData = data;
   
    this.name = this.RestaurantData[0].RName;
    this.address = this.RestaurantData[0].RAddress;
    this.cuisine = this.RestaurantData[0].RCuisine;
    //this.rate = this.RestaurantData[0].RRating;
    this.img = this.RestaurantData[0].RImg;
    this.rating = this.RestaurantData[0].RRating;
    this.id = this.RestaurantData[0].RId;
    });
  }

  gotoRestEdit(){
    this.router.navigate(['rest-info-edit', this.id]);
  }

}
