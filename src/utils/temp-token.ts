import Cookies from "js-cookie"

function getTempToken(): string | undefined {
    return Cookies.get("temp_access_key")
}

function setTempToken(accessToken: string) {
    Cookies.set("temp_access_key", accessToken, { expires: 60 * 60 * 2 })
}

function removeTempToken() {
    Cookies.remove("temp_access_key")
}

export { removeTempToken, setTempToken, getTempToken }
