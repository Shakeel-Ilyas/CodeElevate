import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../Services/auth-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  @ViewChild('username') username: ElementRef;
  @ViewChild('password') password: ElementRef;

  authService: AuthService = inject(AuthService)
  router: Router = inject(Router);
  activeRoute: ActivatedRoute = inject(ActivatedRoute)


  ngOnInit(){
    this.activeRoute.queryParamMap.subscribe((queries) =>{
      const logout = Boolean(queries.get('logout'));
      
      if(logout){
        this.authService.logout();
      }
    })
  }
  

  OnLoginClicked(){

     const username = this.username.nativeElement.value;
     const password = this.password.nativeElement.value;

    
    const user = this.authService.logIn(username, password);

    if(user === undefined){
      alert('The Login credentials you have entered is not correct');
    } else {
      alert('Welcome ' + user.name + '. You are logged In.');
      this.router.navigate(['/Courses'])
    }
  }

}
