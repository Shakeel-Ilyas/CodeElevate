import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, GuardResult, MaybeAsync, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth-service";
import { Observable } from "rxjs";
import { ContactComponent } from "../contact/contact.component";
import { CourseService } from "./course.service";
import { Course } from "../Models/course";

export interface IDeactivateComponent{
    canExit: () => boolean | Observable<boolean> | Promise<boolean>;
    // canExit: () => MaybeAsync<GuardResult>;

}

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild, CanDeactivate<IDeactivateComponent>, Resolve<Course[]>{


    authService: AuthService = inject(AuthService);
    router: Router = inject(Router);
    courseService: CourseService = inject(CourseService)

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        if(this.authService.IsAuthenticated()){
            return true;
        } else {
            this.router.navigate(['/Login'])
            return false;
        }
    }
    
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
         return this.canActivate(childRoute, state);
    }

    canDeactivate(component: IDeactivateComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): MaybeAsync<GuardResult> {
        
        return component.canExit()
        
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<Course[]> {
    return this.courseService.getAllcourses();
    }
}