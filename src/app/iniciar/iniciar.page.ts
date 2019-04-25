import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionService } from '../conexion.service';

@Component({
  selector: 'app-iniciar',
  templateUrl: './iniciar.page.html',
  styleUrls: ['./iniciar.page.scss'],
})
export class IniciarPage implements OnInit {
  datos: any={mail: null, pass:null};

  constructor(private router: Router, private conn: ConexionService) { }
  entrar()
  {
    this.conn.login(this.datos).then(res=>{
      this.router.navigate(['/list']);
      //alert('user.mail');
    }).catch(err => alert('los datos son incorrectos'))
  }
  ngOnInit() {
  }
}
