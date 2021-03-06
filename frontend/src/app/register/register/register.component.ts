import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../shared/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private loginService: LoginService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('',[
        Validators.required
      ]),
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(5)
      ]),
      firstName: new FormControl('',[
        Validators.required
      ]),
      lastName: new FormControl('',[
        Validators.required
      ]),
      email: new FormControl('',[
        Validators.email,
        Validators.required
      ]),
      pesel: new FormControl('',[
        Validators.required
      ])
    });
  }

  get f() { 
    return this.registerForm.controls; 
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const userData = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      name: this.registerForm.value.firstName,
      surname: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      pesel: this.registerForm.value.pesel,
      type: 'patient'
    }

    this.loginService.registerUser(userData).subscribe(
      res => {
        console.log(res);
        this.loginService.activateUser(res.id).subscribe(
          res2 => {
            this.router.navigate(['/login']);
          },
          err2 => {
            console.log(err2);
          }
        )
      },
      err => {
        alert('Podane dane już istnieją w systemie, proszę wprowadzić inne');
      }
    );
    
  }

}
