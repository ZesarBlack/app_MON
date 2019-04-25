import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionService } from '../conexion.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  datos: any={mail: null, pass:null, pass2: null};

  constructor(private conn: ConexionService,private router: Router) { }
  registrar()
  {
    if(this.datos.pass == this.datos.pass2)
    {
      this.conn.registrar(this.datos).then(res=>{
        this.router.navigate(['/list']);
      })
    }
  }

  ngOnInit() {
  }

}
