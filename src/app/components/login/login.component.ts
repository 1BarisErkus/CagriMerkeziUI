import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/entity/services/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  gEmail: string = '';
  gSifre: string = '';
  kontrol: number = -1;

  constructor(
    private apiSvc: ApiServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  girisYap() {
    this.apiSvc.loginKontrol(this.gEmail, this.gSifre).subscribe((result) => {
      if (result == 1){
        this.router.navigate(['/ana-menu']);
      }
      else
      {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Eksik veya hatalı giriş yaptınız!',
        })
      }
    });
  }

}
