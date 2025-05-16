import { NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CourseService } from '../../Services/course.service';
import { Course } from '../../Models/course';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-popular',
  standalone: true,
  imports: [NgFor],
  templateUrl: './popular.component.html',
  styleUrl: './popular.component.css'
})
export class PopularComponent implements OnInit{



  courseService = inject(CourseService)
  popularCourses: Course[] = [];

  router: Router = inject(Router)
  activeRoute: ActivatedRoute = inject(ActivatedRoute)

  ngOnInit(){

    this.popularCourses = this.courseService.courses.filter(c => c.rating >= 4.5);

  }

  navigateToCourses(){
    this.router.navigate(['Courses'], {relativeTo: this.activeRoute})
    // this.router.navigateByUrl('Home/Courses')
  }

}
