import request from '@/util/request'

// 获取导航
export const getNavData = () => {
    return request({
        // url: 'http://183.131.80.131:3000/headerApi/nav',
        url: '/api/headerApi/nav',
        method: 'get',
    })
}

export const logIn = (user: any) => {
    return request({
        // url: 'http://183.131.80.131:3000/headerApi/login',
        url: '/api/headerApi/login',
        method: 'post',
        data: user,
    })
}