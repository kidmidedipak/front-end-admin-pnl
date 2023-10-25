import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../myservice.service';
import { Product } from '../allclasses/product';
import { Category } from '../allclasses/category';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/enviroment.uat';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {
  constructor(private myser:MyserviceService, private http:HttpClient, private route:Router){

  }
  ngOnInit(): void {
    this.obj=this.myser.product;
    this.http.get(environment.url+'category/getall').subscribe(
      (result:any)=>{   
        console.log(result.data)
        this.catearr=result.data;
      }
    )
   
  }
  imgurl:string=environment.url+'images/';
  catearr:Category[]=this.myser.catearr;
  obj:Product=new Product();
  file: File | null = null; 

  selectedImageUrl: string | null = null;
  selectedImage: File | null = null; 

  ischngImg:number=0;
  onFileSelected(event: any) {
    this.file= event.target.files[0];  
    this.ischngImg++;

    if (this.file) {
      this.selectedImage = this.file;
            // Display the selected image in the img tag
           const reader = new FileReader();
           reader.onload = () => {
             this.selectedImageUrl = reader.result as string;
           };
           reader.readAsDataURL(this.file);
         }

    }

 
    save( ){
      
      if(this.ischngImg!=0)
      {
        
      if (this.file) {
        
        const formData = new FormData();
        formData.append('image', this.file);
        formData.append('cid',this.obj.cid+"");
        formData.append('pname',this.obj.pname);
        formData.append('packsize',this.obj.packsize);
        formData.append('mrp', String(this.obj.mrp));
        formData.append('status',this.obj.status);
        
        if(this.obj.pname.trim()=='' || this.obj.packsize.trim()==''
          || this.obj.mrp==0 || this.obj.cid==0)
        {
          alert('Please, fill up all fields')
        }else{
            this.http.put(environment.url+"product/updateWithImg/"+this.obj.id, formData).subscribe((resultData: any)=>
            {
                if(resultData.status)
                {
                  alert("Product Updated Successfully") 
                  this.route.navigate(['/home/products']);
                }
                else{
                  alert('something wrong')
                }
            });
          }
  
      }
    else{
          alert('select product image')
      }
    }else{ 
          if(this.obj.pname.trim()=='' || this.obj.packsize.trim()==''
          || this.obj.mrp==0 || this.obj.cid==0)
        {
          alert('Please, fill up all fields')
        }else{
          this.http.put(environment.url+"product/update/"+this.obj.id, this.obj).subscribe((resultData: any)=>
            {
                if(resultData.status)
                {
                  alert("Product Updated Successfully") 
                  this.route.navigate(['/home/products']);
                }
                else{
                  alert('something wrong')
                }
            });
         }
    }
       
    }

}
