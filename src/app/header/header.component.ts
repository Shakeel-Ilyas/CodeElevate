import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../Services/user.service';
import { AuthService } from '../Services/auth-service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{

  // activeRoute: ActivatedRoute = inject(ActivatedRoute);
  // fragObs;

  
  authService: AuthService = inject(AuthService);
  
  ngOnInit(){

  
    
  // this.fragObs = this.activeRoute.fragment.subscribe((data) =>{
  //   if(data != null && data != ''){
  //     console.log(data)
  //     this.JumpToSection(data);
  //   }
      
  //   });

  }

  JumpToSection(section){
    document.getElementById(section).scrollIntoView({behavior: 'smooth'})
  }

  ngOnDestroy(){
    // this.fragObs.unsubscribe()
  }
}
