import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BannerComponent } from './banner/banner.component';
import { PopularComponent } from './popular/popular.component';
import { TestimonyComponent } from './testimony/testimony.component';
import { ServicesComponent } from './services/services.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BannerComponent,
    PopularComponent,
    TestimonyComponent,
    ServicesComponent,
    ContactUsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  firstName: string = '';
  lastName: string = '';
  country: string = '';
  message: string = '';

  isSubmitted: boolean = false;

  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  fragObs;

  ngOnInit() {
    this.fragObs = this.activeRoute.fragment.subscribe((data) => {
      if (data != null && data != '') {
        this.JumpToSection(data);
      }
    });
  }

  JumpToSection(section) {
    document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
  }

  updateFormFieldsValue(formFieldsValue) {
    this.firstName = formFieldsValue.firstName;
    this.lastName = formFieldsValue.lastName;
    this.country = formFieldsValue.country;
    this.message = formFieldsValue.message;

    this.isSubmitted = formFieldsValue.isSubmitted;
  }

  canExit() {
    if (
      (this.firstName || this.lastName || this.country || this.message) &&
      !this.isSubmitted
    ) {
      return confirm(
        'You have unsaved changes in contact-us section. Do you want to navigate away?'
      );
    } else {
      return true;
    }
  }

  ngOnDestroy() {
    this.fragObs.unsubscribe();
  }
}
