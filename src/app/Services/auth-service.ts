import { inject, Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    isLogged: Boolean = false;
    userService: UserService = inject(UserService);




    logIn(username: string, password: string) {
        
        let user = this.userService.users.find(
            (u) => u.username === username && u.password === password
        );

        if(user === undefined){
            this.isLogged = false;
        } else {
            this.isLogged = true;
        }
        return user;
    }

    logout(){
        this.isLogged = false;
        alert('You are now logged out. IsLogged = ' + this.isLogged)
    }

    IsAuthenticated(){
        return this.isLogged;
    }
}
