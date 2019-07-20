import request from '@/utils/request'

const defaultParams = {
    type:1
}

export function userLogin(payload) {
    const url = '/user/login';
    return request.post(url, {
        ...defaultParams,
        ...payload
    })
}

export async function addUser(payload){
    const url='/add';
    const result=await request.post(url,{
        ...defaultParams,
        ...payload
    })
    return result
}

export function userList(payload) {
    const url = '/userlist';
    let result=request.get(url, {
        ...defaultParams,
        ...payload
    })
    return result
}

export function updateData(payload) {
    const url = '/update';
    let result=request.post(url, {
        ...defaultParams,
        ...payload
    })
    return result
}

export function deleteData(payload) {
    const url = '/delete';
    let result=request.post(url, {
        ...defaultParams,
        ...payload
    })
    return result
}


