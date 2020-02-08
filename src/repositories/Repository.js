import axios from 'axios';

const baseDomain = 'https://ergast.com';
const baseURL = `${baseDomain}/api`;

export default axios.create({
  baseURL,
});
