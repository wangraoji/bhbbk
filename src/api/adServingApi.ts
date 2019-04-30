import request from '@/util/request'
import api from '@/util/api';

// 获取导航
const getAdServingData = () => {
    return request({
        url: api + '/adServing',
        method: 'get',
    })
}
export { getAdServingData } 