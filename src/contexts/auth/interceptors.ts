import type { AxiosInstance } from "axios"

const initializeInterceptors = (
    management: AxiosInstance,
    getAccessToken: () => string | null,
    refreshAccessToken: () => Promise<string | null>,
    logout: () => void
) => {
    const requestInterceptor = management.interceptors.request.use(
        (config) => {
            const token = getAccessToken()
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        },
        (error) => Promise.reject(error)
    )

    let isRefreshing = false
    let refreshSubscribers: ((token: string | null) => void)[] = []

    const subscribeTokenRefresh = (
        callback: (token: string | null) => void
    ) => {
        refreshSubscribers.push(callback)
    }

    const onRefreshed = (token: string | null) => {
        for (const callback of refreshSubscribers) {
            callback(token)
        }
        refreshSubscribers = []
    }

    const responseInterceptor = management.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config

            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true

                if (!isRefreshing) {
                    isRefreshing = true
                    try {
                        const newToken = await refreshAccessToken()
                        isRefreshing = false
                        onRefreshed(newToken)
                        if (newToken) {
                            originalRequest.headers.Authorization = `Bearer ${newToken}`
                            return management(originalRequest)
                        }
                    } catch (refreshError) {
                        isRefreshing = false
                        onRefreshed(null)
                        logout()
                        return Promise.reject(refreshError)
                    }
                }

                return new Promise((resolve, reject) => {
                    subscribeTokenRefresh((newToken) => {
                        if (newToken) {
                            originalRequest.headers.Authorization = `Bearer ${newToken}`
                            resolve(management(originalRequest))
                        } else {
                            reject(error)
                        }
                    })
                })
            }

            return Promise.reject(error)
        }
    )

    return { request: requestInterceptor, response: responseInterceptor }
}

export { initializeInterceptors }
