import request from '@/util/request'
import api from '@/util/api';

// 获取导航
const getNavData = () => {
    return request({
        url: api + '/headerApi/nav',
        method: 'get',
    })
}

const logIn = (user: any) => {
    return request({
        url: api + '/headerApi/login',
        method: 'post',
        data: user,
    })
}

export { getNavData, logIn } 