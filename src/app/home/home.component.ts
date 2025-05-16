import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BannerComponent } from './banner/banner.component';
import { PopularComponent } from './popular/popular.component';
import { TestimonyComponent } from './testimony/testimony.component';
import { ServicesComponent } from './services/services.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ActivatedRoute } from '@angular/router';
import { AuthGuardService, IDeactivateComponent } from '../Services/authguard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent, PopularComponent, TestimonyComponent, ServicesComponent, ContactUsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy{


    activeRoute: ActivatedRoute = inject(ActivatedRoute);
    fragObs;

  ngOnInit(){


    this.fragObs = this.activeRoute.fragment.subscribe((data) =>{
      if(data != null && data != ''){ 
        this.JumpToSection(data);
      }
        
      });
  }

  JumpToSection(section){
    document.getElementById(section).scrollIntoView({behavior: 'smooth'})
  }

  ngOnDestroy(){
    this.fragObs.unsubscribe()
  }
}
