import { Component, DoCheck, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent implements DoCheck {
  firstName: string = '';
  lastName: string = '';
  country: string = '';
  message: string = '';

  isSubmitted: boolean = false;

  @Output() formFieldsValueEvent: EventEmitter<any> = new EventEmitter();

  ngDoCheck() {
    this.isSubmitted = false;
    this.formFieldsValueEvent.emit({
      firstName: this.firstName,
      lastName: this.lastName,
      country: this.country,
      message: this.message,
      isSubmitted: this.isSubmitted,
    });
  }

  OnSubmit() {
    this.isSubmitted = true;

    this.firstName = '';
    this.lastName = '';
    this.country = '';
    this.message = '';
  }

  canExit() {
    if (
      (this.firstName || this.lastName || this.country || this.message) &&
      !this.isSubmitted
    ) {
      return confirm('You have unsaved changes. Do you want to navigate away?');
    } else {
      return true;
    }
  }
}
