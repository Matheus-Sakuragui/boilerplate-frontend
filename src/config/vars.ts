const apiURLCEP = "https://viacep.com.br/ws"
const apiCore = "http://localhost:3332"
const apiManagement = process.env.NEXT_PUBLIC_GERENCIADOR_ACESSO_URL 
const apiBucket = "http://localhost:5000"
const environ = process.env.APP_ENV || "dev"

export { apiURLCEP, apiCore, apiManagement, environ, apiBucket }
