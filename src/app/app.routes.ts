import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CoursesComponent } from './courses/courses.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { LoginComponent } from './login/login.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { canActivate, resolve } from './Guards/auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  {
    path: 'Home',
    component: HomeComponent,
    canDeactivate: [(comp: HomeComponent) => comp.canExit()],
  },
  { path: 'About', component: AboutComponent },
  {
    path: 'Contact',
    component: ContactComponent,
    canDeactivate: [(comp: ContactComponent) => comp.canExit()],
  },
  { path: 'Courses', component: CoursesComponent },
  {
    path: 'Home',
    children: [
      { path: 'Courses', resolve: [resolve], component: CoursesComponent },
      {
        path: 'Courses/Checkout',
        component: CheckoutComponent,
        canActivate: [canActivate],
      },
      { path: 'Courses/Course/:id', component: CourseDetailComponent },
    ],
  },
  {
    path: 'Courses',
    children: [
      { path: 'Course/:id', component: CourseDetailComponent },
      {
        path: 'Checkout',
        component: CheckoutComponent,
        canActivate: [canActivate],
      },
    ],
  },
  { path: 'Login', component: LoginComponent },
  { path: '**', component: NotFoundComponent },
];
