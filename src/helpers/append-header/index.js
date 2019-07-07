export const appendStyleSheet = (url, options = {}) => {
  const method = options.method || "append";
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = url;
  console.log(method);
  document.head[method](link);
};
