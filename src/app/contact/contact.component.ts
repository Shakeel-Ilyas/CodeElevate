import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IDeactivateComponent } from '../Services/authguard.service'

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements IDeactivateComponent{
  firstName: string = '';
  lastName: string = '';
  country: string = '';
  message: string = '';

  isSubmitted: boolean = false;

  OnSubmit(){
    this.isSubmitted = true;
  }

  canExit(){
    if((this.firstName || this.lastName || this.message) && !this.isSubmitted){
     return confirm('You have unsaved changes. Do you want to navigate away?')
    } else {
      return true;
    }
  }
}
