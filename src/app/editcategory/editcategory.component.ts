import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MyserviceService } from '../myservice.service';
import { Category } from '../allclasses/category';
import { environment } from 'src/environment/enviroment.uat';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.css']
})
export class EditcategoryComponent {

  
  constructor(private http:HttpClient, private router:Router, private myser:MyserviceService ){
    this.obj=myser.category;
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
        this.http.put(environment.url+"category/update/"+this.obj.id, this.obj).subscribe((resultData: any)=>
        {
            if(resultData.status)
            {
              alert("Category Successfully updated") 
              this.router.navigate(['/home/categories']);
            }
            else{
              alert('something wrong')
            }
        });
      }
}

}
