// 引入request.js文件
import request from '../utils/request';

export function fetch({ page = 1 }) {
  return request(`/api/engine/init/v2/auth/menu?_page=${page}&_limit=5`);
}

export function fetchSedAndTlvList(option:any) {
  return request(`/api/engine/init/v2/auth/menu?flv=${option.flv}&lv=${option.lv}`);
}

export function fetchTlvList(option:any) {
  return request(`/api/engine/init/v2/auth/menu?sed=${option.sed}&lv=${option.lv}`);
}

export function remove(id:any) {
  return request(`/api/users/${id}`, {
    method: 'DELETE',
  });
}

export function patch(id:any, values:any) {
  return request(`/api/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}

export function create(values:any) {
  return request('/api/users', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
