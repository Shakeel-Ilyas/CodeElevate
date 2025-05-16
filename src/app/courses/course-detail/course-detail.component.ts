import { AfterContentChecked, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CourseService } from '../../Services/course.service';
import { Course } from '../../Models/course';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent implements OnInit, OnDestroy{

  router: Router = inject(Router)
  courseService: CourseService = inject(CourseService);
  courseId: number;
  selectedCourse: Course;
  
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  paramMapObs;


  ngOnInit(){

    // this.courseId = +this.activeRoute.snapshot.params('id');
    // this.courseId = +this.activeRoute.snapshot.paramMap.get('id')
    // this.activeRoute.params.subscribe((data) =>{

    //   this.courseId = +data['id']
    //   if(this.courseId > 0 && this.courseId <= this.courseService.courses.length){
      
    //     this.selectedCourse = this.courseService.courses.find(course => course.id === this.courseId);
    //   } else {
    //     this.router.navigate(['Courses', 'Course', this.courseId, 'not-found'])
    //   }
    // })

   this.paramMapObs = this.activeRoute.paramMap.subscribe((data) =>{

      this.courseId = +data.get('id')
      if(this.courseId > 0 && this.courseId <= this.courseService.courses.length){
      
        this.selectedCourse = this.courseService.courses.find(course => course.id === this.courseId);
      } else if (this.courseId <= 0) {
        this.router.navigate(['Courses', 'Course', '1'])

        
      } else{
        this.router.navigate(['Courses', 'Course', '8'])

      }
    })
    
    
  }

  ngOnDestroy() {
    this.paramMapObs.unsubscribe();
  }



}
