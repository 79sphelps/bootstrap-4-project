"use strict";

// server/config.js
module.exports = {
  AUTH0_DOMAIN: "sphelps.auth0.com",
  AUTH0_API_AUDIENCE: "http://localhost:8083/apii/",
  MONGO_URI:
    process.env.MONGO_URI ||
    "mongodb://sphelps:newjob18@ds159661.mlab.com:59661/eventplanningnw",
  NAMESPACE: "http://myapp.com/roles" // from Auth0.com rules specification
};
