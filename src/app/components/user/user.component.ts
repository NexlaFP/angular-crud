import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  users: any[] = [];
  userForm: FormGroup;

  constructor(private _userService: UserService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this._userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.registerUser(this.userForm.value);
    }
  }

  registerUser(user: any): void {
    this._userService.registerUser(user).subscribe(
      (response) => {
        console.log('User registered successfully', response);
        // Optionally, refresh the user list after registration
        this._userService.getUsers().subscribe((data) => {
          this.users = data;
        });
      },
      (error) => {
        console.error('Error registering user', error);
      }
    );
  }
}
