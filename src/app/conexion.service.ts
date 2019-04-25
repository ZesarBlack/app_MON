import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestore,  AngularFirestoreCollection  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


export interface Nota { id: string; descripcion: string; titulo: string; fecha: string; lat: number; lng: number; img_id: number;}


@Injectable({
  providedIn: 'root'
})
export class ConexionService {

  private itemsCollection: AngularFirestoreCollection<Nota>;
  notas: Observable<Nota[]>;
  //id: number;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore){
    this.itemsCollection = afs.collection<Nota>('notas/');
    this.notas = this.itemsCollection.valueChanges();

  }

  login(datos)
  {
    return new Promise((resolve, rejected)=>{
      this.afAuth.auth.signInWithEmailAndPassword(datos.mail, datos.pass).then(user=>{
        resolve(user);
      }).catch(err=> rejected(err));
    })
  }

  registrar(datos)
  {
    return new Promise((resolve, rejected)=>{
      this.afAuth.auth.createUserWithEmailAndPassword(datos.mail, datos.pass).then(user=>{
        resolve(user);
      }).catch(err=> rejected(err));
    })
  }
  crear(descripcion:string, titulo: string, fecha: string, lat: number, lng: number, img_id: number) {
    // Persist a document id
    //const id = this.afs.createId();
    const id = (Date.now()).toString();

    const nota: Nota = { id, descripcion, titulo, fecha, lat, lng, img_id};
    this.itemsCollection.doc(id).set(nota);
  }
}
