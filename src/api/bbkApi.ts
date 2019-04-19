import request from '@/util/request'
import api from '@/util/api';
// 获取版本查询条件
const getbbkcxtj = () => {
    return request({
        url: api + '/bbkApi/cxtj',
        method: 'get',
    })
}

// 获取版本库公告
const getbbkgg = () => {
    return request({
        url: api + '/bbkApi/gg',
        method: 'get',
    })
}

// 获取版本
const getbbkdata = (data: any) => {
    return request({
        url: api + '/bbkApi/bbkdata',
        method: 'post',
        data: data
    })
}

// 查询版本
const searchbb = (data: any) => {
    return request({
        url: api + '/bbkApi/search',
        method: 'post',
        data: data
    })
}

// 获取版本底部信息
const getfooterInfo = () => {
    return request({
        url: api + '/bbkApi/footerInfo',
        method: 'get',
    })
}
export { getbbkcxtj, getbbkgg, getbbkdata, searchbb,getfooterInfo } 