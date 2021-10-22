// import jsonServerProvider from 'ra-data-json-server';
import jsonServerProvider from './jsonServer';

export const baseUrl = '/api/v2'
export const devBaseUrl = 'http://localhost:4000'

export const emailHost = '@ic.dmail.ai'

// /node_modules/ra-data-json-server/src/index.ts.  
const IdParamNams = ['getOne', 'update', 'delete']
const productJsonSever = jsonServerProvider(baseUrl)
// name: getList/getOne...
export const fetch = (resource: string, name: string, params: any) => {
  if (IdParamNams.includes(name) && !['string', 'number'].includes(typeof params)) {
    throw new Error('The fetch params must be string or number');
  }

  const args = IdParamNams.includes(name) ? { id: params } : { data: params }
  return productJsonSever[name](`${resource}/${name}`, args)
}