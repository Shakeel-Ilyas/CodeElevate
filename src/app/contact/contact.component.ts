import { Component, DoCheck } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements DoCheck {
  firstName: string = '';
  lastName: string = '';
  country: string = '';
  message: string = '';

  isSubmitted: boolean = false;

  ngDoCheck(): void {
    this.isSubmitted = false;
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
