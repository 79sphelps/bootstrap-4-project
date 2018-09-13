// src/app/auth/auth.service.ts
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { AUTH_CONFIG } from "./auth.config";
import * as auth0 from "auth0-js";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import { mergeMap } from "rxjs/operators";
import "rxjs/add/observable/of";
import "rxjs/add/observable/timer";
//import { of, timer } from "rxjs";

@Injectable()
export class AuthService {
  // Create Auth0 web auth instance
  private _auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.CLIENT_ID,
    domain: AUTH_CONFIG.CLIENT_DOMAIN,
    responseType: "token",
    redirectUri: AUTH_CONFIG.REDIRECT,
    audience: AUTH_CONFIG.AUDIENCE,
    scope: AUTH_CONFIG.SCOPE
  });
  userProfile: any;
  // Create a stream of logged in status to communicate throughout app
  loggedIn: boolean;
  loggingIn: boolean;

  isAdmin: boolean;

  // Subscribe to token expiration stream
  refreshSub: Subscription;

  // An RxJS BehaviorSubject is used to provide a stream of
  // authentication status events that we can subscribe to anywhere in the app.
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);

  constructor(private router: Router) {
    // If authenticated, set local profile property
    // and update login status subject.
    // If not authenticated but there are still items
    // in localStorage, log out.
    const lsProfile = localStorage.getItem("profile");

    if (this.tokenValid) {
      // this.userProfile = JSON.parse(lsProfile);
      // this.setLoggedIn(true);
      this.userProfile = JSON.parse(localStorage.getItem("profile"));
      this.isAdmin = localStorage.getItem("isAdmin") === "true";
      this.setLoggedIn(true);
      this.scheduleRenewal();
    } else if (!this.tokenValid && lsProfile) {
      this.logout();
    }

    this.loggingIn = false;
  }

  setLoggedIn(value: boolean) {
    // Update login status subject
    this.loggedIn$.next(value);
    this.loggedIn = value;

    this.loggingIn = false;
  }

  login() {
    this.loggingIn = true;

    // Auth0 authorize request
    this._auth0.authorize();
  }

  handleAuth() {
    // When Auth0 hash parsed, get profile
    this._auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) {
        window.location.hash = "";
        this._getProfile(authResult);
      } else if (err) {
        console.error(`Error authenticating: ${err.error}`);
      }
      this.router.navigate(["/"]);
    });
  }

  private _getProfile(authResult) {
    // Use access token to retrieve user's profile and set session
    this._auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (profile) {
        this._setSession(authResult, profile);
      } else if (err) {
        console.error(`Error authenticating: ${err.error}`);
      }
    });
  }

  /*
  private _redirect() {
    const redirect = decodeURI(localStorage.getItem("authRedirect"));
    const navArr = [redirect || "/"];

    this.router.navigate(navArr);
    // Redirection completed; clear redirect from storage
    this._clearRedirect();
  }
  */

  private _redirect() {
    // Redirect with or without 'tab' query parameter
    // Note: does not support additional params besides 'tab'
    const fullRedirect = decodeURI(localStorage.getItem("authRedirect"));
    const redirectArr = fullRedirect.split("?tab=");
    const navArr = [redirectArr[0] || "/"];
    const tabObj = redirectArr[1]
      ? { queryParams: { tab: redirectArr[1] } }
      : null;

    if (!tabObj) {
      this.router.navigate(navArr);
    } else {
      this.router.navigate(navArr, tabObj);
    }
    // Redirection completed; clear redirect from storage
    this._clearRedirect();
  }

  private _clearRedirect() {
    // Remove redirect from localStorage
    localStorage.removeItem("authRedirect");
  }

  private _setSession(authResult, profile?) {
    // Save session data and update login status subject
    const expiresAt = JSON.stringify(authResult.expiresIn * 1000 + Date.now());
    // Set tokens and expiration in localStorage and props
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("expires_at", expiresAt);
    localStorage.setItem("profile", JSON.stringify(profile));
    this.userProfile = profile;

    this.isAdmin = this._checkAdmin(profile);
    localStorage.setItem("isAdmin", this.isAdmin.toString());

    // If initial login, set profile and admin information
    if (profile) {
      localStorage.setItem("profile", JSON.stringify(profile));
      this.userProfile = profile;
      this.isAdmin = this._checkAdmin(profile);
      localStorage.setItem("isAdmin", this.isAdmin.toString());
    }

    // Update login status in loggedIn$ stream
    this.setLoggedIn(true);

    // Schedule access token renewal
    this.scheduleRenewal();
  }

  private _checkAdmin(profile) {
    // Check if the user has admin role
    const roles = profile[AUTH_CONFIG.NAMESPACE] || [];
    return roles.indexOf("admin") > -1;
  }

  logout(noRedirect?: boolean) {
    // Ensure all auth items removed from localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("profile");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("authRedirect");

    localStorage.removeItem("isAdmin");
    // Reset local properties, update loggedIn$ stream
    this.userProfile = undefined;
    this.isAdmin = undefined;
    this.setLoggedIn(false);

    // Unschedule access token renewal
    this.unscheduleRenewal();
    // Return to homepage
    if (noRedirect !== true) {
      this.router.navigate(["/"]);
    }

    // Reset local properties, update loggedIn$ stream
    // this.userProfile = undefined;
    // this.setLoggedIn(false);
    // Return to homepage
    // this.router.navigate(['/']);
  }

  get tokenValid(): boolean {
    // Check if current time is past access token's expiration
    const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return Date.now() < expiresAt;
  }

  renewToken() {
    this._auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken) {
        this._setSession(authResult);
      } else if (err) {
        console.warn(`Could not renew token: ${err.errorDescription}`);
        // Log out without redirecting to clear auth data
        this.logout(true);
        // Log in again
        this.login();
      }
    });
  }

  scheduleRenewal() {
    // If user isn't authenticated, do nothing
    if (!this.tokenValid) {
      return;
    }
    // Unsubscribe from previous expiration observable
    this.unscheduleRenewal();
    // Create and subscribe to expiration observable
    const expiresAt = JSON.parse(localStorage.getItem("expires_at"));

    const expiresIn$ = Observable.of(expiresAt).pipe(
      mergeMap(expires => {
        const now = Date.now();
        // Use timer to track delay until expiration
        // to run the refresh at the proper time
        return Observable.timer(Math.max(1, expires - now));
      })
    );

    /* ALTERNATIVE
    // Create and subscribe to expiration observable
    const expiresIn$ = of(this.expiresAt).pipe(
      mergeMap(
        expires => {
          const now = Date.now();
          // Use timer to track delay until expiration
          // to run the refresh at the proper time
          return timer(Math.max(1, expires - now));
        }
      )
    );
    */

    this.refreshSub = expiresIn$.subscribe(() => {
      this.renewToken();
      this.scheduleRenewal();
    });
  }

  unscheduleRenewal() {
    if (this.refreshSub) {
      this.refreshSub.unsubscribe();
    }
  }
}
