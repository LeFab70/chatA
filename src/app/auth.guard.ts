import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseServiceTsService } from './services/supabase.service.ts.service';

export const authGuard: CanActivateFn = (route, state) => {
  if (inject(SupabaseServiceTsService).isLoggedIn===false) {
    inject(Router).navigate(['/login'])
    return false
  }
  return true;
};
