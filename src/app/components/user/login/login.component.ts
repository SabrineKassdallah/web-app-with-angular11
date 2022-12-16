import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup?: FormGroup
  isLoggedIn = false;
  isLoginFailed = false;
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private fb:FormBuilder, private notifyService: NotificationService, private router: Router ) { }

  ngOnInit(): void {

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }

    this.loginFormGroup = this.fb.group({
      email:["", Validators.required],
      password:["", Validators.minLength(6)],
      
    })
  }

  onSiginIn(): void {

    this.authService.login(this.loginFormGroup?.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.notifyService.showSuccess(data["successMessage"], "  Logged successful!")

        // this.goBack();
      },
      error => {
        this.notifyService.showError(error.error.message, "failed")
        this.isLoginFailed = true;
      }
    );
  }

  // reloadPage(): void {
  //   window.location.reload();
  // }

//   goBack () {
//     this.router.navigate(['']);
// }

}
