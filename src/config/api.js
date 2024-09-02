import { BASE_URL, CONTENT_TYPE } from "./config";

const client = (url, options) => {
  const baseOptions = {
    headers: {
      "content-type": CONTENT_TYPE,
    },
  };

  const user = localStorage.getItem("user");
  if (user) {
    const { token } = JSON.parse(user);
    token &&
      (baseOptions.headers.authorization = `Bearer ${token}`);
  }

  return fetch(`${BASE_URL}${url}`, {
    ...baseOptions,
    ...options,
  });
};

const api = {
  post(url, payload) {
    return client(url, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  get(url, params) {
    const urlParams = params
      ? "/?" + new URLSearchParams(params).toString()
      : "";
    return client(`${url}${urlParams}`, {
      method: "GET",
    });
  },
};

export default api;
