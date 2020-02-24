import axios from 'axios'
import {HOST} from 'common/js/config'

export const TOP_LIST = [0, 1, 2, 3, 4, 5] //8, 10, 17, 18, 22, 25, 27, 31]

export function getTop (id) {
  const url = `${HOST}/top/list?idx=${id}`
  return axios.get(url)
}
