import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserManagementComponent } from './features/users/components/user-management/user-management';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserManagementComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
