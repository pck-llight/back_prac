import axios from "axios";

const baseURL = 'http://localhost:3001/api/posts'

const instance = axios.create({
  baseURL: `${baseURL}`,
  timeout: 10000,
  // headers: {'X-Custom-Header': 'foobar'}
});

export {instance}