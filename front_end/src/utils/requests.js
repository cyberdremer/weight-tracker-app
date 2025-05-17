import { data } from "react-router";
import backendUrl from "./backendurl";
const objectToForm = (form) => {
  const formData = new FormData();
  Object.entries(form).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return formData;
};

const postRequest = async (endpoint, body) => {
  const bodyData = objectToForm(body);
  const query = new URLSearchParams(bodyData).toString();
  const response = await fetch(`${backendUrl + endpoint}`, {
    method: "post",
    mode: "cors",
    body: query,
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error.message || response.statusText);
  }

  return data;
};

const protectedPostRequestJSON = async (endpoint, body) => {
  const response = await fetch(`${backendUrl + endpoint}`, {
    method: "post",
    body: JSON.stringify(body),
    credentials: "include",
    mode: "cors",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error.message || response.statusText);
  }

  return data;
};
const protectedPostRequest = async (endpoint, body) => {
  const bodyData = objectToForm(body);
  const query = new URLSearchParams(bodyData).toString();
  const response = await fetch(`${backendUrl + endpoint}`, {
    credentials: "include",
    method: "post",
    body: query,
    mode: "cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error.message || response.statusText);
  }
  return data;
};

const protectedPostRequestDownload = async (endpoint, body) => {
  const response = await fetch(`${backendUrl + endpoint}`, {
    credentials: "include",
    method: "post",
    mode: "cors",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
    },
  });

  const file = await response.blob();
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return file;
};

const protectedGetRequest = async (endpoint) => {
  const response = await fetch(`${backendUrl + endpoint}`, {
    method: "get",
    credentials: "include",
    mode: "cors",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error.message || response.statusText);
  }
  return data;
};

const protectedGetRequestDownload = async (endpoint) => {
  const response = await fetch(`${backendUrl + endpoint}`, {
    method: "get",
    credentials: "include",
    mode: "cors",
  });
  const file = await response.blob();

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return file;
};

const protectedPutRequest = async (endpoint, body) => {
  const bodyData = objectToForm(body);
  const query = new URLSearchParams(bodyData).toString();
  const response = await fetch(`${backendUrl + endpoint}`, {
    method: "put",
    body: query,
    mode: "cors",
    credentials: "include",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error.message || response.statusText);
  }
  return data;
};

const protectedDeleteRequest = async (endpoint, body) => {
  const form = objectToForm(body);
  const query = new URLSearchParams(form).toString();
  const response = await fetch(`${backendUrl + endpoint}`, {
    method: "delete",
    credentials: "include",
    mode: "cors",
    body: query,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error.message || response.statusText);
  }
  return data;
};

export {
  protectedGetRequest,
  protectedDeleteRequest,
  protectedPostRequest,
  protectedPutRequest,
  postRequest,
  protectedPostRequestJSON,
  protectedGetRequestDownload,
  protectedPostRequestDownload,
};
