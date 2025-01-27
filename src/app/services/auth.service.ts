import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private allowedEmails: string[] = [
    // Add allowed emails here
    "juan.alexander.chilcon@gmail.com",
    "Stiip8@gmail.com",
    "Victor.dlx26@gmail.com",
    "marcopazpant@gmail.com",
    "cabanillasjunior15@gmail.com",
    "cvillalobosramirez@gmail.com",
    "luisdavidhernandezleon@gmail.com",
    "escorpio17sc@gmail.com",
    "Peluchelainesvallejos@gmail.com",
    "ivan16sc@gmail.com",
    "tommyhuaman72@gmail.com",
    "galvezmarinjersonalejandro90@gmail.com",
    "olanodiaz10@gmail.com",
    "julianyuhsef@gmail.com",
    "maycolchavezfernandez@gmail.com",
    "Juliocotrina123@gmail.com",
    "rimarachincristofer@gmail.com",
    "dannyrmf@gmail.com",
    "gersonbarturen@gmail.com",
    "anderdayan200324@gmail.com",
    "Klismarchinchayalvarez@gmail.com",
    "williamrt169@gmail.com",
    "gersonniverbautista@gmail.com"
  ];

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private auth: Auth) {
    this.auth.onAuthStateChanged((user) => {
      //if (user && this.isEmailAllowed(user.email!)) {
    if (user) {
        this.isAuthenticatedSubject.next(true);
        this.currentUserSubject.next(user);
      } else {
        this.isAuthenticatedSubject.next(false);
        this.currentUserSubject.next(null);
      }
    });
  }

  async loginWithGoogle(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      const user = result.user;

      //if (user.email && this.isEmailAllowed(user.email)) {
      if (user.email) {
        this.isAuthenticatedSubject.next(true);
        this.currentUserSubject.next(user);
      } else {
        // If email is not allowed, sign out the user
        await this.logout();
        throw new Error('Email is not allowed to access this application.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.isAuthenticatedSubject.next(false);
      this.currentUserSubject.next(null);
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  }

  public isEmailAllowed(email: string): boolean {
    return this.allowedEmails.includes(email);
  }
}
