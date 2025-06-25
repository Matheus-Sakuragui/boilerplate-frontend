import Cookies from "js-cookie"

function getToken(): string | undefined {
    return Cookies.get("restapp-token")
}

function setToken(accessToken: string) {
    Cookies.set("restapp-token", accessToken, { expires: 60 * 60 * 2 })
}

function removeToken() {
    Cookies.remove("restapp-token")
}

export { removeToken, setToken, getToken }
