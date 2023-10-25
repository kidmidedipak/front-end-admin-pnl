import { Component } from '@angular/core';
import { Product } from '../allclasses/product';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/enviroment.uat';
import { Router } from '@angular/router';
import { Category } from '../allclasses/category';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent {

 

  constructor(private http:HttpClient, private router:Router, private myser:MyserviceService ){
    this.http.get(environment.url+'category/getall').subscribe(
      (result:any)=>{   
        console.log(result.data)
        for (let index = 0; index < result.data.length; index++) {
          if(result.data[index].status=="Active")
          {
            this.catearr.push(result.data[index]);

          }
          
        }
      }
    )
  }


  obj:Product=new Product();
    file: File | null = null; 
    catearr:Category[]=[];
    selectedImageUrl: string | null = null;
    selectedImage: File | null = null; 


    onFileSelected(event: any) {
    this.file= event.target.files[0]; 
      
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
          this.http.post(environment.url+"product/add",formData).subscribe((resultData: any)=>
          {
              if(resultData.status)
              {
                alert("Product Successfully added") 
                this.router.navigate(['/home/products']);
              }
              else{
                alert('something wrong')
              }
          });
        }

    }else{
      alert('select product image')
    }
     
  }


  

}
