
const app_name = "listest"

export function buildPath(route) {
    if (process.env.NODE_ENV === "production") {
        return "http://" + app_name + ".eastus.cloudapp.azure.com/" + route;
    } else {
        return "http://localhost:5000/" + route;
    }
}

export function config () {
    const token = {headers : {'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`}}
    return token;
}

export function refreshToken(){
    const refreshToken = localStorage.getItem('refreshToken')
    return refreshToken;
} 



