import { HTTP } from '../utils/http'

const http = new HTTP()

// 获取最新一期期刊
const getLatest = () => {
  return http.request({
    url: 'classic/latest'
  })
}

// 获取上一期、下一期期刊
const getNextOrPrevious = (index, nextOrPrevious) => {
  return http.request({
    url: `classic/${index}/${nextOrPrevious}`,
  })
}

export { getLatest, getNextOrPrevious }