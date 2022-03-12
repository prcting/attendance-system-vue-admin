import axios from "axios";
import router from "./router"
import Element from "element-ui";

axios.defaults.baseURL = "http://localhost:8888"

const req = axios.create({
    timeout: 5000,
    headers: {
        'Content-Type': "application/json; charset=uft-8"
    }
})

req.interceptors.request.use(config => {
    config.headers['authorization'] = localStorage.getItem("token")
    return config
})

req.interceptors.response.use(resp => {
    let data = resp.data
    if (data.code === 200) {
        return resp
    } else {
        Element.Message.error(data.msg ? data.msg:'系统异常')
        return Promise.reject(resp.data.msg)
    }
}, error => {
    console.log(error)
    if (error.response.data) {
        error.message = error.response.data.msg
    }

    if (error.response.status === 401 || error.response.status === 403) {
        router.push("/login")
    }

    Element.Message.error(error.message, {duration: 3000})
    return Promise.reject(error)
})

export default req()
