import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CagriModel } from 'src/app/entity/models/cagri-model';
import { ApiServiceService } from 'src/app/entity/services/api-service.service';

@Component({
  selector: 'app-cagri-liste',
  templateUrl: './cagri-liste.component.html',
  styleUrls: ['./cagri-liste.component.css']
})

export class CagriListeComponent implements OnInit {

  cagriListe: CagriModel[] = [];
  inputArama: string = '';

  constructor(
    private apiSvc: ApiServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllCagri();
  }

  getAllCagri() {
    this.apiSvc.getAllCagriSvc(0)
      .subscribe((data) => (
        this.cagriListe = data
      ));
  }

  deleteCagri(id: number) {
    this.apiSvc.deleteCagriSvc(id)
      .subscribe();
    window.location.reload();
  }

  editCagri(id: number) {
    localStorage.setItem('id', id.toString());
    this.router.navigate(['/ana-menu/cagri-kayit']);
  }

  kayitAra(name: string) {
    this.apiSvc.searchKayit(name)
      .subscribe((result) => {
        this.cagriListe = result;
      });
  }

}
