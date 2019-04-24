import request from '@/util/request'
import api from '@/util/api';

// 获取导航
const getAboutData = () => {
    return request({
        url: api + '/aboutApi',
        method: 'get',
    })
}
export { getAboutData } 