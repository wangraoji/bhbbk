import request from '@/util/request'
import api from '@/util/api';

// 获取版本增删改查配置
const getbbkactionCfg = () => {
    return request({
        url: api + '/bbkApi/actionCfg',
        method: 'get',
    })
}

// 获取版本增删改查配置
const getbbkad = () => {
    return request({
        url: api + '/bbkApi/ad',
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

// 新增版本
const addbb = (data: any) => {
    return request({
        url: api + '/bbkApi/add',
        method: 'post',
        data: data
    })
}

// 删除版本
const deletebb = (data: any) => {
    return request({
        url: api + '/bbkApi/delete',
        method: 'post',
        data: data
    })
}

// 删除版本
const editbb = (data: any) => {
    return request({
        url: api + '/bbkApi/edit',
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
export { getbbkgg, getbbkdata, searchbb, getfooterInfo, getbbkactionCfg, addbb, deletebb,editbb,getbbkad } 