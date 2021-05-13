import React from 'react';

export const config = {
    headers : {'Authorization' : 'Bearer ' + localStorage.getItem('acessToken')
    }
}

const app_name = "lis-test"

export function buildPath(route) {
    if (process.env.NODE_ENV === "production") {
        return "https://" + app_name + ".azurewebsites.net" + route;
    } else {
        return "http://localhost:5000/" + route;
    }
}
