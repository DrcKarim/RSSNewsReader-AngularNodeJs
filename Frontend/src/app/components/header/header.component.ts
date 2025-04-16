import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from '../../pages/login/login.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    ReactiveFormsModule,
    LoginComponent,
    FormsModule,
    CommonModule
  ],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  showLogin = false;
}
