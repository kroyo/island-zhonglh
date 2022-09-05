import { HTTP } from '../utils/http'

const http = new HTTP()

// 获取最新一期期刊
const getHotList = () => {
  return http.request({
    url: 'book/hot_list'
  })
}

export { getHotList }