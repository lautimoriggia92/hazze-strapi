module.exports = [
  "strapi::errors",
  {
    name: "strapi::cors",
    config: {
      origin: [
        "https://hazze.com.ar",
        "http://31.97.84.176",
      ],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      headers: ["*"],
      credentials: true,
    },
  },
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:", "https://hazze.com.ar", "http://31.97.84.176"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "market-assets.strapi.io",
            "https://hazze.com.ar",
            "http://31.97.84.176",
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
