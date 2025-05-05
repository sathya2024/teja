import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loggedInUser: any = null;

  constructor() {
    // Initialize loggedInUser from localStorage
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      this.loggedInUser = JSON.parse(user);
    }
  }

  getUserId(): number {
    return this.loggedInUser?.id; // Return the user ID from the loggedInUser object
  }

  setUser(user: any): void {
    this.loggedInUser = user;
    localStorage.setItem('loggedInUser', JSON.stringify(user)); // Store the user in localStorage
  }

  clearUser(): void {
    this.loggedInUser = null;
    localStorage.removeItem('loggedInUser'); // Remove loggedInUser from localStorage
    localStorage.removeItem('userId'); // Remove userId
    localStorage.removeItem('authToken'); // Remove authToken
    localStorage.removeItem('isLoggedIn'); // Remove isLoggedIn flag
    localStorage.removeItem('userEmail'); // Remove userEmail
  }

  logout(): void {
    this.clearUser(); // Clear user data
    console.log('User logged out successfully');
  }
}
