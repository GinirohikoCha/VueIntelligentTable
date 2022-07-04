import request from '@/utils/request'

export function list (entity, data) {
  return request({
    url: `/${entity}/list`,
    method: 'post',
    data
  })
}

export function select (entity, data) {
  return request({
    url: `/${entity}/select`,
    method: 'post',
    data
  })
}

export function detail (entity, id) {
  return request({
    url: `/${entity}/${id}`,
    method: 'get'
  })
}

export function create (entity, data) {
  return request({
    url: `/${entity}/create`,
    method: 'post',
    data
  })
}

export function updateBatch (entity, data) {
  return request({
    url: `/${entity}/update`,
    method: 'put',
    data
  })
}

export function deleteBatch (entity, ids) {
  return request({
    url: `/${entity}/delete`,
    method: 'delete',
    data: ids
  })
}
