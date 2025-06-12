import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CourseService } from '../Services/course.service';
import { Course } from '../Models/course';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [NgFor, RouterLink, NgIf],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent implements OnInit, OnDestroy {
  coursesService = inject(CourseService);
  AllCourses: Course[];

  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  searchString: string;
  paramMapObs;

  showNoCourseAvailablePara: boolean = false;

  ngOnInit() {
    this.paramMapObs = this.activeRoute.queryParamMap.subscribe((data) => {
      this.searchString = data.get('search');

      if (
        this.searchString === undefined ||
        this.searchString === '' ||
        this.searchString === null
      ) {
        this.AllCourses = this.coursesService.courses;
      } else {
        this.AllCourses = this.coursesService.courses.filter((x) => {
          return x.title
            .toLowerCase()
            .includes(this.searchString.toLowerCase());
        });

        if (this.AllCourses.length === 0) {
          this.showNoCourseAvailablePara = true;
        }
      }
    });
  }

  ngOnDestroy() {
    this.paramMapObs.unsubscribe();
  }
}
