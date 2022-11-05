import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CagriModel } from 'src/app/entity/models/cagri-model';
import { PersonelModel } from 'src/app/entity/models/personel-model';
import { ApiServiceService } from 'src/app/entity/services/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cagri-kayit',
  templateUrl: './cagri-kayit.component.html',
  styleUrls: ['./cagri-kayit.component.css']
})
export class CagriKayitComponent implements OnInit {

  kayitRef: number = 0;
  cagri = new CagriModel();
  personel: PersonelModel[] = [];

  fgKayit = new FormGroup(
    {
      personel_id: new FormControl(''),
      customer_name: new FormControl(''),
      customer_phone: new FormControl(''),
      subject: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(''),
      call_date: new FormControl('')
    });

  constructor(
    private apiSvc: ApiServiceService
  ) { }

  ngOnInit(): void {
    this.kayitRef = Number(localStorage.getItem('id'));
    this.cagri = JSON.parse(localStorage.getItem('cagri') || '{}')
    localStorage.removeItem('id')
    if (this.kayitRef > 0) {
      this.getCagri();
    }
    this.getPersonel();
  }

  get controls(): FormGroup["controls"] {
    return this.fgKayit.controls;
  }

  modelToForm() {
    this.fgKayit.controls.personel_id.setValue(this.cagri.PERSONEL_ID.toString());
    this.fgKayit.controls.customer_name.setValue(this.cagri.CUSTOMER_NAME.toString());
    this.fgKayit.controls.customer_phone.setValue(this.cagri.CUSTOMER_PHONE.toString());
    this.fgKayit.controls.subject.setValue(this.cagri.SUBJECT.toString());
    this.fgKayit.controls.description.setValue(this.cagri.DESCRIPTION.toString());
    this.fgKayit.controls.price.setValue(this.cagri.PRICE.toString());
    this.fgKayit.controls.call_date.setValue(this.cagri.CALL_DATE !.toString().substring(0,10))
  }

  formToModel() {
    this.cagri.PERSONEL_ID = Number(this.fgKayit.controls.personel_id.value);
    this.cagri.CUSTOMER_NAME = this.fgKayit.controls.customer_name.value || "ui";
    this.cagri.CUSTOMER_PHONE = this.fgKayit.controls.customer_phone.value || "ui";
    this.cagri.SUBJECT = this.fgKayit.controls.subject.value || "ui";
    this.cagri.DESCRIPTION = this.fgKayit.controls.description.value || "ui";
    this.cagri.PRICE = Number(this.fgKayit.controls.price.value);
  }

  inputControlToModel(tarihUnput: any): any {
    if (typeof(tarihUnput) == 'string'){
      return tarihUnput;
    }
    else{
      if (tarihUnput == null) return "ui";
    }
  }

  getCagri() {
    this.apiSvc.getAllCagriSvc(this.kayitRef)
      .subscribe((result) => {
        this.cagri = result[0];
        this.modelToForm();
      });
  }

  add_update_gorev() {
    this.formToModel();
    //return;
    this.apiSvc.add_updateCagriSvc(this.cagri)
      .subscribe();
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Kayıt Düzenlendi',
      showConfirmButton: false,
      timer: 1500
    })
  }

  getPersonel() {
    this.apiSvc.getAllPersonel()
      .subscribe((result: PersonelModel[]) => {
        this.personel = result;
      })
  }

}
