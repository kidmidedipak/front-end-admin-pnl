import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environment/enviroment.uat';
import { Product } from '../allclasses/product';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, private http:HttpClient) {}

  obj:Product=new Product();
  sign(){
    this.obj.pname=this.obj.pname.trim();
    this.obj.packsize=this.obj.packsize.trim();
    this.http.post(environment.url+'admin/login',this.obj).subscribe(
      (result:any)=>{ 
      if(result.status)
      {
        localStorage.setItem("loginUser", "admin");
        this.router.navigate(['/home/dashboard']); 
      }else{
        alert('Invalid user') 
      }
      }
    )
  }
}
