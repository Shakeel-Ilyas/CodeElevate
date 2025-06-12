import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth-service';
import { CourseService } from '../../Services/course.service';

export const canActivate = function () {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (authService.IsAuthenticated()) {
    return true;
  } else {
    router.navigate(['/Login']);
    return false;
  }
};

export const canActivateChild = () => {
  canActivate();
};

export const resolve = () => {
  const courseService: CourseService = inject(CourseService);

  return courseService.getAllcourses();
};
