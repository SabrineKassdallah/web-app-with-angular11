import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userFormGroup?: FormGroup

  isSuccessful = false;
  isSignUpFailed = false;

  constructor(private authService: AuthService, private fb:FormBuilder, private notifyService: NotificationService ) { }

  ngOnInit(): void {
    this.userFormGroup = this.fb.group({
      username:["", Validators.required],
      email:["", Validators.required],
      password:["", Validators.minLength(6)],
      
    })
  }

  onRegister(): void {

    this.authService.register(this.userFormGroup?.value).subscribe(
      data => {
        this.isSuccessful = true;
        this.notifyService.showSuccess(data["successMessage"], " Your registration is successful!")

      },
      error => {
        this.notifyService.showError(error.error.message, "failed")
        this.isSignUpFailed = true;
      });
  }

}
