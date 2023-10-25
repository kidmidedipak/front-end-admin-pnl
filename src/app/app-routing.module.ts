import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgetpassComponent } from './forgetpass/forgetpass.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { CatelistComponent } from './catelist/catelist.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EditcategoryComponent } from './editcategory/editcategory.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { AuthGuard  } from './services/guards/AuthGuard .guard';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'forgetpass', component:ForgetpassComponent},
  {path:'home', component:SidebarComponent, 
  canActivate:[AuthGuard ],
  children: [
    {path:'dashboard', component:HomeComponent},
    {path:'products', component:ProductlistComponent},
    {path:'addprodcuct', component:AddproductComponent},
    {path:'categories', component:CatelistComponent},
    {path:'addcategory', component:AddcategoryComponent},
    {path:'editproduct/:id', component:EditproductComponent},
    {path:'editcategory/:id', component:EditcategoryComponent},
  ]
},
{path:'**', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
