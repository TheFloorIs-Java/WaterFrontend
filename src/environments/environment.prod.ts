// export const environment = {
//   production: true
// };


export const environment = {
  production: false,
  withCredentials: true,
  baseUrl: "https://teamwater.azurewebsites.net",
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:4200/',
  },
};