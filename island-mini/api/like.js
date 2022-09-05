import { HTTP } from '../utils/http'

const http = new HTTP()

// 收藏期刊
const like = (data) => {
  return http.request({
    url: 'like',
    method: 'POST',
    data
  })
}

// 取消收藏期刊
const cancel = (data) => {
  return http.request({
    url: 'like/cancel',
    method: 'POST',
    data
  })
}

export { like, cancel }