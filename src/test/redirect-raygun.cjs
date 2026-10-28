const http = require("http");
const https = require("https");

https.request = (url, options) => {
  const target = new URL(url);
  if (
    target.hostname !== "app.raygun.com" ||
    target.pathname !== "/upload/jssymbols/test-project"
  ) {
    throw new Error("Unexpected network request in upload regression test");
  }
  target.protocol = "http:";
  target.hostname = "127.0.0.1";
  target.port = process.env.RAYGUN_TEST_PORT;
  return http.request(target, {
    ...options,
    protocol: "http:",
    hostname: target.hostname,
    port: target.port,
  });
};
