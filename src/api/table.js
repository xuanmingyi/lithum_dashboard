import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}

export function getTagList(params) {
  return request({
    url: 'http://localhost:8080/v1/tag',
    method: 'get',
    params
  })
}

export function createTag(name, color) {
  return request({
    url: 'http://localhost:8080/v1/tag',
    method: 'post',
    data: {
      'name': name,
      'color': color
    }
  })
}

export function updateTag(id, name, color) {
  return request({
    url: 'http://localhost:8080/v1/tag/'+id,
    method: 'post',
    data: {
      'name': name,
      'color': color
    }
  })
}

export function deleteTag(ids) {
  return request({
    url: 'http://localhost:8080/v1/tag',
    method: 'delete',
    data: {
      'ids': ids.map((v)=>{return v.id})
    }
  })
}