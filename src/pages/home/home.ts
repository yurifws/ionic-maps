import { Component, AfterViewInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';


declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit {
  
  map: any;
  markers: any;

  constructor(public navCtrl: NavController, 
    private geolocation: Geolocation, 
    private plataform: Platform,
    private nativeGeocoder: NativeGeocoder) {
  }

  ngAfterViewInit(){
    this.plataform.ready().then(()=>{
      this.initPage();
      
    }).catch((error: any) => {
      console.log(error)
    });
  }
  initPage(){
    this.geolocation.getCurrentPosition().then((retorno:any) => {
      this.loadMap(retorno.coords.latitude,retorno.coords.longitude)
    }).catch((error: any) => {
      console.log(error);
    });
  }

  loadMap(lat, lng) {

    const latLng = new google.maps.LatLng(lat, lng);

    const mapOptions = {
      center: latLng,
      zoom: 15,
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControl: true,
      disableDefaultUI: true
    }

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);


    let myLocationMaker = this.addMarker(latLng, this.map);

    this.nativeGeocoder.reverseGeocode(lat, lng)
    .then((result: any) => {
      console.log(JSON.stringify(result))
    }).catch((error: any) => {
      console.log(error)}
    );


    // pega o centro do mapa => this.map.getCenter()

    //atualizacao do usuario em construcao
    //setTimeout(() => {
    //  this.addMarker(this.map.getCenter(), this.map);
    //}, 3000);

  }

  addMarker(position, map){
    return new google.maps.Marker({
      position,
      map
    });
  }
  adicionaMarcador(){
    //this.addMarker(this.map.getCenter(), this.map)
    // this.nativeGeocoder.reverseGeocode(this.map.getCenter().lat, this.map.getCenter().lng)
    // .then((result: NativeGeocoderReverseResult) => console.log(JSON.stringify(result)))
    // .catch((error: any) => console.log(error));
  }

}
