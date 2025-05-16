import { NgFor } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CourseService } from '../Services/course.service';
import { Course } from '../Models/course';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../Services/user.service';
import { FormsModule } from '@angular/forms';
import { IDeactivateComponent } from '../Services/authguard.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent implements OnInit, OnDestroy {


  coursesService = inject(CourseService);
  AllCourses: Course[];

  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  searchString: string;
  paramMapObs;

  ngOnInit() {
    // this.searchString = this.activeRoute.snapshot.queryParams['search'];
    // this.searchString = this.activeRoute.snapshot.queryParamMap.get('search');
    //  this.activeRoute.queryParams.subscribe((data)=>{
    //     this.searchString = data['search']

    //     if (this.searchString === undefined || this.searchString === '' || this.searchString === null) {
    //       this.AllCourses = this.coursesService.courses;
    //     } else {
    //       this.AllCourses = this.coursesService.courses.filter((x) => {
    //         return x.title.toLowerCase().includes(this.searchString.toLowerCase());
    //       });
    //     }
    // })

    this.paramMapObs = this.activeRoute.queryParamMap.subscribe((data) => {
      this.searchString = data.get('search');

      if (
        this.searchString === undefined ||
        this.searchString === '' ||
        this.searchString === null
      ) {
        this.coursesService.getAllcourses().subscribe((data: Course[]) =>{
            this.AllCourses = data;
        });
      // this.AllCourses = this.activeRoute.snapshot.data['courses']
       
      } else {
        this.AllCourses = this.coursesService.courses.filter((x) => {
          return x.title
            .toLowerCase()
            .includes(this.searchString.toLowerCase());
        });
      }
    });
  }

  ngOnDestroy() {
    this.paramMapObs.unsubscribe();
  }
}
