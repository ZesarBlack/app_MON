import { Component, OnInit } from '@angular/core';
//import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';




@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss'],

})
export class ListPage implements OnInit {
  items: Observable<any[]>;
  constructor(private afs: AngularFirestore, private router: Router) {
    this.items = afs.collection('notas').valueChanges();
  }
  ngOnInit() {
  }
  ver(lat, lng, descripcion, img_id)
  {
    this.router.navigate(['/info',lat, lng, descripcion, img_id]);
    //console.log(lat);
    //console.log(lng);
  }
}
