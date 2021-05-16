import {request} from './request'

export function getDetail(iid) {
  return request({
    url:'/detail/iid/comments',
    params:{
      iid
    }
  })
}
