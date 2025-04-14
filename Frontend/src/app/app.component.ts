import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {FeedListComponent} from './components/feed-list/feed-list.component';
import {HeaderComponent} from './components/header/header.component';

/*
The AppComponent is the root component of the Angular app. It's declared as a standalone component and imports necessary modules and
child components (RouterOutlet, HttpClientModule, FormsModule, FeedListComponent, and HeaderComponent).
It uses app.component.html as the template and sets a basic title.
This component acts as the main shell for rendering the app's layout and routing structure.
*/

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule, FormsModule, FeedListComponent, HeaderComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Frontend';
}

/*
The reason you're seeing HttpClientModule marked as deprecated in the standalone component context is due to how Angular
now encourages using standalone APIs in newer versions (v15+),
and HttpClientModule was split into a new importable function for standalone components.

I should use this instead
import { provideHttpClient } from '@angular/common/http';
*/
