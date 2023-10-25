import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MyserviceService } from '../myservice.service';
import { Category } from '../allclasses/category';
import { environment } from 'src/environment/enviroment.uat';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent {

  constructor(private http:HttpClient, private router:Router, private myser:MyserviceService ){
  }

  obj:Category=new Category();

  cancel(){
    this.router.navigate(['/home/categories'])
  }

  
  save( ){

    if(this.obj.cname.trim()=='' || this.obj.description.trim()=='')
    {
      alert('Please, fill up all fields')
    }else{
        this.http.post(environment.url+"category/add",this.obj).subscribe((resultData: any)=>
        {
            if(resultData.status)
            {
              alert("Category Successfully added") 
              this.router.navigate(['/home/categories']);
            }
            else{
              alert('something wrong')
            }
        });
      }
      
      
}



}
