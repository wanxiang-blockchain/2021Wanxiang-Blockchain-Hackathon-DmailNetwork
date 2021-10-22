//  https://github.com/marmelab/react-admin/tree/master/packages/ra-data-json-server
// import jsonServerProvider from 'ra-d ata-json-server';
import jsonServerProvider from '../utils/jsonServer';
import { resources } from '../App';
import { baseUrl, devBaseUrl } from '../utils'

// const restProvider = jsonServerProvider('http://localhost:4000');
// const delayedDataProvider: any = new Proxy(restProvider, {
//     get: (target, name, self) =>
//         name === 'then' // as we await for the dataProvider, JS calls then on it. We must trap that call or else the dataProvider will be called with the then method
//             ? self
//             : (resource: string, params: any) =>
//                 new Promise(resolve =>
//                     setTimeout(
//                         () => {
//                             resolve(
//                                 restProvider[name as string](resource, params)
//                             )
//                         },
//                         500
//                     )
//                 ),
// });

const restProvider = {
    product: jsonServerProvider(baseUrl),
    mock: jsonServerProvider(devBaseUrl),
};
const jsonServerActions = jsonServerProvider('')
const delayedDataProvider: any = new Proxy(jsonServerActions, {
    get: (target, name, self) => {
        return name === 'then' // as we await for the dataProvider, JS calls then on it. We must trap that call or else the dataProvider will be called with the then method
            ? restProvider.mock[name as string] // use deault
            : (resource: string, params: any) =>
                new Promise(resolve =>
                    setTimeout(
                        () => {
                            const isProduct = resources.filter(({ name, useMock }) => !resource.indexOf(`${name}/`) && !useMock).length;
                            // console.log('111', name, resource, params, restProvider[isProduct ? 'product' : 'mock'][name as string](resource, params).then(res => console.log(res)))
                            resolve(
                                restProvider[isProduct ? 'product' : 'mock'][name as string](resource, params)
                            )
                        },
                        500
                    )
                )
    },
});

export default delayedDataProvider;
