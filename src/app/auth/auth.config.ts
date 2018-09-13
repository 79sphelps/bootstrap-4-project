// src/app/auth/auth.config.ts
import { ENV } from "./../core/env.config";

interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
  NAMESPACE: string;
}

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: "okyknFBMmn1B6qSKP6Zj04J2GI5Xzco4",
  CLIENT_DOMAIN: "sphelps.auth0.com",
  AUDIENCE: "http://localhost:8083/apii/",
  REDIRECT: `${ENV.BASE_URI}/callback`,
  SCOPE: "openid profile",
  NAMESPACE: "http://myapp.com/roles"
};
