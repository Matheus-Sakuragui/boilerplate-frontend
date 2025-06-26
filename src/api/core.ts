import axios from "axios"
import { apiCore } from "@/config/vars"

const core = axios.create({
    baseURL: apiCore,
})

export { core }
