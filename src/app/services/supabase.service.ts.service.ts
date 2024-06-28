import { inject, Injectable, NgZone } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';
const SUPABASE_URL = environment.supabaseUrl;
const SUPABASE_ANON_KEY = environment.supabaseKey;
@Injectable({
  providedIn: 'root',
})
export class SupabaseServiceTsService {
  private supabase: SupabaseClient;
  private router = inject(Router);
  private _ngZone=inject(NgZone)
  constructor() {
    this.supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    this.supabase.auth.onAuthStateChange((event, session) => {
      // console.log(event);
      // console.log(session);
      localStorage.setItem('session', JSON.stringify(session?.user));
      if (session?.user) {
        this._ngZone.run(()=>{
          this.router.navigate(['/chat']);
        })
       
      }
    });
  }

  signUp(email: string, password: string) {
    return this.supabase.auth.signUp({ email, password });
  }

  signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  // async signOut() {
  //   localStorage.removeItem('session')
  //   localStorage.clear();
  //   return await this.supabase.auth.signOut();
  // }
  async signOut() {
    await this.supabase.auth.signOut();
    localStorage.clear();
  }

  async signInWithProvider(provider: 'google' | 'github' | 'linkedin') {
    await this.supabase.auth.signInWithOAuth({ provider });
  }

  get isLoggedIn():boolean{
    const user=localStorage.getItem('session') as string
    return user==='undefined'?false:true
  }
  // async getUser(id:string):Promise<any>{
    
  //     const data = await this.supabase.from('users').select('*').eq('id', id);
  
  //     return data;
   
  
  // }


  getUser() {
    const session = localStorage.getItem('session');
    if (session) {
      return JSON.parse(session).user_metadata;
    }
    return null;
  }
}
