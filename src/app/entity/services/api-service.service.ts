import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CagriModel } from '../models/cagri-model';
import { PersonelModel } from '../models/personel-model';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  apiUrl = "http://localhost:5031/Cagri"

  constructor(
    private http: HttpClient
  ) { }

  getAllCagriSvc(id: number) {
    return this.http.get<CagriModel[]>(this.apiUrl + "/liste?id=" + id.toString());
  }

  deleteCagriSvc(id: number) { 
    return this.http.delete(this.apiUrl + "/" + id.toString());
  }

  add_updateCagriSvc(cagri: CagriModel){
    if(cagri.ID>0){
      return this.http.put(this.apiUrl, cagri);
    }
    else{
      return this.http.post(this.apiUrl, cagri);
    }
  }

  getAllPersonel(){
    return this.http.get<PersonelModel[]>('http://localhost:5031/Personel/liste')
  }

  loginKontrol(email: string, sifre: string) {
    return this.http.get<number>('http://localhost:5031/Personel' + '/loginControl?email=' + email + '&sifre=' + sifre)
  }

  searchKayit(name: string) {
    return this.http.get<CagriModel[]>(this.apiUrl + '/ara?gelenIsim=' + name)
  }

}
