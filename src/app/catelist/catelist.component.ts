import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environment/enviroment.uat';
import { Category } from '../allclasses/category';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-catelist',
  templateUrl: './catelist.component.html',
  styleUrls: ['./catelist.component.css']
})
export class CatelistComponent implements OnInit{
  

  constructor(private http:HttpClient, private router:Router, private myser:MyserviceService){}

  ngOnInit(): void {
    this.http.get(environment.url+'category/getall').subscribe(
      (result:any)=>{   
        console.log(result.data)
        this.catearr=result.data;
      }
    )
  }

  catearr:Category[]=[];

  edit(id:any){
    for (let index = 0; index < this.catearr.length; index++) {
      if(id==this.catearr[index].id)
      {
        this.myser.category=this.catearr[index];
      } 
    }
    this.router.navigate(['/home/editcategory/'+id])
      
  }

  deleteprod(id:number){
    if(confirm("Are you sure you want to delete?")) {
      
      this.http.delete(environment.url+'category/delete/'+id).subscribe(
        (result:any)=>{ 
          for (let index = 0; index < this.catearr.length; index++) {
            if(this.catearr[index].id==id)
            {
              alert('Successfully  delete')
              this.catearr.splice(index,1);
            }
            
          }
        }
      )} 
    }


    short(search:any){
      
      console.log("search "+search+"------------------------------------------------ ");
      var matcharr:Category[]=[];
      var unmatcharr:Category[]=[];
      for (let index = 0; index < this.catearr.length; index++) {
        
        if(this.catearr[index].cname.toLowerCase().includes(search.toLowerCase())
        || this.catearr[index].description.toLowerCase().includes(search.toLowerCase()) || this.catearr[index].status.toLowerCase().includes(search.toLowerCase()) )
        {
          console.log(this.catearr[index].cname+" "+(search));
          matcharr.push(this.catearr[index])
        }else{
          unmatcharr.push(this.catearr[index])
        }
      }
      
      this.catearr=[...matcharr,...unmatcharr];
      console.log(this.catearr);
      
    }
}
