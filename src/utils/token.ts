import Cookies from "js-cookie"

function getToken(): string | undefined {
    return Cookies.get("access_key")
}

function setToken(accessToken: string) {
    Cookies.set("access_key", accessToken, { expires: 60 * 60 * 2 })
}

function removeToken() {
    Cookies.remove("access_key")
}

export { removeToken, setToken, getToken }
