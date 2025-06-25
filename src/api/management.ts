import axios from "axios"
import { apiManagement } from "@/config/vars"

const management = axios.create({
    baseURL: apiManagement,
})

export { management }
