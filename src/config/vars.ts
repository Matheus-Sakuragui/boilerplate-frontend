const apiURLCEP = "https://viacep.com.br/ws"
const apiCore = "http://localhost:3332"
const apiManagement = "http://localhost:3334"
const apiBucket = "http://localhost:5000"
const environ = process.env.APP_ENV || "dev"

export { apiURLCEP, apiCore, apiManagement, environ, apiBucket }
