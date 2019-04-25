import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionService } from '../conexion.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {
  //location:any={titulo:null, descripcion:null, fecha:null};
  descripcion: string;
  titulo: string;
  fecha: string;
  lat:number;
  lng:number;
  img_id:number;
  nom_img:number;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;


  constructor(private storage: AngularFireStorage, private conn: ConexionService, private router: Router, private geolocation: Geolocation ) { }

  ngOnInit() {
      this.img_id = Date.now();
  }

  publicar()
  {
    this.conn.crear(this.descripcion,this.titulo, this.fecha, this.lat, this.lng, this.img_id);
    this.ir_lista()
  }
  ir_lista()
  {
    this.router.navigateByUrl('/list');
  }
  posicion()
  {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  uploadFile(event)
  {
    const file = event.target.files[0];
    const filePath = '/f_noticia/'+this.img_id;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = fileRef.getDownloadURL() )
     )
    .subscribe()
  }

}
