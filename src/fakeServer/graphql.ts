import JsonGraphqlServer from 'json-graphql-server';
import generateData from '../datas';
import fetchMock from 'fetch-mock';
import { baseUrl, devBaseUrl } from '../utils'

export default () => {
    const data = generateData({ serializeDate: false });
    const restServer = JsonGraphqlServer({ data });
    const handler = restServer.getHandler();
    const handlerWithLogs = (url: string, opts: any) =>
        handler(url, opts).then((res: any) => {
            const req = JSON.parse(opts.body);
            const parsedRes = JSON.parse(res.body);
            console.groupCollapsed(`GraphQL ${req.operationName}`);
            console.group('request');
            console.log('operationName', req.operationName);
            console.log(req.query);
            console.log('variables', req.variables);
            console.groupEnd();
            console.group('response');
            console.log('data', parsedRes.data);
            console.log('errors', parsedRes.errors);
            console.groupEnd();
            console.groupEnd();
            return res;
        });

    fetchMock.mock(`begin:${devBaseUrl}`, handlerWithLogs);
    return () => fetchMock.restore();
};
