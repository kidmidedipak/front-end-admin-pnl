import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from '../allclasses/product';
import { environment } from 'src/environment/enviroment.uat';
import { MyserviceService } from '../myservice.service';
import { Category } from '../allclasses/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit{

  constructor(private http:HttpClient,private router:Router, private myser:MyserviceService)
  {
    console.log('component called')
    this.http.get(environment.url+'category/getall').subscribe(
      (result:any)=>{   
        console.log(result.data)
        this.catearr=result.data;
      }
    )

    this.http.get(environment.url+'product/getall').subscribe(
      (result:any)=>{ 
        console.log(result.data);
        this.myser.prodarr=result.data;
        this.prodarr=result.data;
      }
    )
 
  }
  ngOnInit(): void { 
  }
  imgurl:string=environment.url+'images/';
  catearr:Category[]= [];
  prodarr:Product[]=[];
  


  deleteprod(id:number){
    if(confirm("Are you sure you want to delete?")) {
      
      this.http.delete(environment.url+'product/delete/'+id).subscribe(
        (result:any)=>{ 
         
        }
      )
      for (let index = 0; index < this.prodarr.length; index++) { 
        if(this.prodarr[index].id==id)
        {
          alert('Successfully  delete')
          this.prodarr.splice(index,1);
        } 
        
      }  
    }
    }


    check(cid:any){
      for (let index = 0; index < this.catearr.length; index++) {
        if(cid==this.catearr[index].id)
        {
          return this.catearr[index].cname;
        }
        
      }
      return "category";
    }

    edit(id:any){
      this.router.navigate(['/home/editproduct/'+id])
      for (let index = 0; index < this.prodarr.length; index++) {
        if(id==this.prodarr[index].id)
        {
          this.myser.product=this.prodarr[index];
        }
        
      }
    }

    short(search:any){
      
      console.log("search "+search+"------------------------------------------------ ");
      var matcharr:Product[]=[];
      var unmatcharr:Product[]=[];
      search=search.trim().toLowerCase();
      for (let index = 0; index < this.prodarr.length; index++) {
        
        if(this.prodarr[index].pname.toLowerCase().includes(search)
        || this.prodarr[index].packsize.toLowerCase().includes(search) 
      || this.prodarr[index].status.toLowerCase().includes(search)
      || this.prodarr[index].mrp==search)
        {
          matcharr.push(this.prodarr[index])
        }else{
          unmatcharr.push(this.prodarr[index])
        }
      }
      
      this.prodarr=[...matcharr,...unmatcharr]; 
      
    }
 
}
