import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastController, Platform, LoadingController} from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
//import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation
} from '@ionic-native/google-maps';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  map: GoogleMap;
  loading: any;
  //latit: any;
  //lngit: any;
  lati: number;
  lngi: number;
  descripcion: string;
  img_id: string;
  profileUrl: Observable<string | null>;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;


  constructor(private storage: AngularFireStorage ,public route: ActivatedRoute ,public loadingCtrl: LoadingController, public toastCtrl: ToastController, private platform: Platform)
  {
    //this.id = navParams.get('id');
      this.lati = +this.route.snapshot.paramMap.get('lat');
      this.lngi = +this.route.snapshot.paramMap.get('lng');
      this.descripcion = this.route.snapshot.paramMap.get('descripcion');
      this.img_id = this.route.snapshot.paramMap.get('img_id');

      const ref = this.storage.ref('f_noticia/'+this.img_id);
      this.profileUrl = ref.getDownloadURL();
      //this.lati= +this.latit;
      //this.lngi= +this.lngit;
  }



  async ngOnInit() {
    await this.platform.ready();
    await this.loadMap();
  }
  /*
  ver()
  {
    console.log(this.lati);
    console.log(this.lngi);
    console.log(this.descripcion);
  }
*/
  loadMap() {
    //this.lati=43.0741704;
    //this.lngi=-89.3809802;
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: this.lati,
          lng: this.lngi
        },
        zoom: 18,
        tilt: 30
      }
    });
    let marker: Marker = this.map.addMarkerSync({
      title: 'Noticia',
      snippet: 'todo pasó acá!',
      position: {
        lat: this.lati,
        lng: this.lngi
      },
      animation: GoogleMapsAnimation.BOUNCE
    });

  }

  async onButtonClick() {

    //this.map.clear();

    this.loading = await this.loadingCtrl.create({
      message: 'espere un momento...'
    });
    await this.loading.present();

    // Get the location of you
    this.map.getMyLocation().then((location: MyLocation) => {
      this.loading.dismiss();
      console.log(JSON.stringify(location, null ,2));

      // Move the map camera to the location with animation
      this.map.animateCamera({
        target: location.latLng,
        zoom: 17,
        tilt: 30
      });

      // add a marker
      let marker: Marker = this.map.addMarkerSync({
        title: 'Yo',
        snippet: 'acá estoy!',
        position: location.latLng,
        animation: GoogleMapsAnimation.BOUNCE
      });

      // show the infoWindow
      marker.showInfoWindow();

      // If clicked it, display the alert
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        this.showToast('clicked!');
      });
    })
    .catch(err => {
      this.loading.dismiss();
      this.showToast(err.error_message);
    });
  }

  async showToast(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });

    toast.present();
  }
}
