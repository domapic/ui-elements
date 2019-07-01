const getConfig = {
  url: "/api/config",
  method: "GET",
  response: {
    status: 200,
    body: {
      color: true,
      logLevel: "info",
      port: 3000,
      authDisabled: ["127.0.0.1", "::1/128"],
      hostName: "",
      db: "mongodb://localhost:27017/domapic",
      sslCert: "/etc/letsencrypt/live/foo/fullchain.pem",
      sslKey: "/etc/letsencrypt/live/foo-domapin/privkey.pem",
      rejectUntrusted: false,
      auth: true
    }
  }
};

const getConfigNoCustom = {
  url: "/api/config",
  method: "GET",
  response: {
    status: 200,
    body: {
      color: true,
      logLevel: "info",
      port: 3000,
      authDisabled: ["127.0.0.1", "::1/128"],
      hostName: "",
      sslCert: "/etc/letsencrypt/live/foo/fullchain.pem",
      sslKey: "/etc/letsencrypt/live/foo-domapin/privkey.pem",
      rejectUntrusted: false,
      auth: true
    }
  }
};

const getConfigError = {
  url: "/api/config",
  method: "GET",
  response: {
    status: 502,
    body: {
      error: "Bad Gateway",
      message: "Service not available",
      statusCode: 502
    }
  }
};

module.exports = {
  getConfig,
  getConfigNoCustom,
  getConfigError
};
