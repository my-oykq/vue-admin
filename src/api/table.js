import request from '@/utils/request'

// 表格数据获取
export const getTableData = () => {
  return request({
    url: '/tabledata',
    method: 'GET'
  })
}

// 表格数据删除
export const deleteTableData = params => {
  return request({
    url: '/tabledata',
    method: 'DELETE',
    params
  })
}
