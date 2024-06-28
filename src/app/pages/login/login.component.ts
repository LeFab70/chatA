import { Component } from '@angular/core';
import { SupabaseServiceTsService } from '../../services/supabase.service.ts.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  constructor(private supabaseService: SupabaseServiceTsService) {}

  signUp() {
    this.supabaseService.signUp(this.email, this.password).then(response => {
      console.log('Sign up successful:', response);
    }).catch(error => {
      console.error('Error signing up:', error);
    });
  }

  signIn() {
    this.supabaseService.signIn(this.email, this.password).then(response => {
      console.log('Sign in successful:', response);
    }).catch(error => {
      console.error('Error signing in:', error);
    });
  }

 signInWithProvider(provider: 'google' | 'github' | 'linkedin') {
    this.supabaseService.signInWithProvider(provider).then(response => {
      console.log('Sign in with provider successful:', response);
    }).catch(error => {
      console.error('Error signing in with provider:', error);
    });
  }
}
