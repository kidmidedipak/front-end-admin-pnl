import { Injectable, OnInit } from '@angular/core';
import { Product } from './allclasses/product';
import { Category } from './allclasses/category';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/enviroment.uat';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService implements OnInit {

  constructor(private http:HttpClient) { 
    
  }
  ngOnInit(): void {
    
  }

   prodarr:Product[]=[];
    catearr:Category[]=[];
  
    category: Category=new Category(); 
    product:Product=new Product(); 

  getproducts(){ 
    this.http.get(environment.url+'product/getall').subscribe(
      (result:any)=>{ 
        console.log(result.data);
        this.prodarr=result.data;
      }
    )
    
  }
  getcategory(){ 
    this.http.get(environment.url+'category/getall').subscribe(
      (result:any)=>{   
        console.log(result.data)
        this.catearr=result.data;
      }
    )
      
  }


}
