import { random, internet, name, system } from 'faker/locale/en';
import isAfter from 'date-fns/is_after';
import subDays from 'date-fns/sub_days';
import coinlist from './coinlist.json';

import {
    randomDate,
    randomFloat,
    weightedArrayElement,
    weightedBoolean,
} from './utils';
import { TagFacesSharp } from '@material-ui/icons';

var Range = 9 - 1;
var Rand = Math.random();
var RangePrice = 500 - 1;

var Rangewin = 50000 - 10;
var Rangewtotal = 100000 - 1;
var Randppwin = Math.random();


export default (db, { serializeDate }) => {
    const today = new Date();
    const aMonthAgo = subDays(today, 30);
    const realCustomers = db.customers.filter(customer => customer.has_ordered);

    return Array.from(Array(100).keys()).map(id => {



        //const coinl = coinlist[Math.floor(Math.random()*coinlist.length)];
        const coinl = random.arrayElement<any>(coinlist);
        const projecttemp = {
            name: coinl.cryptoCurrency.slug,
            projectName: coinl.projectName,
            content: 'base64xxxxxxxxxxxxcode',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/' + coinl.cryptoCurrency.cryptoId + '.png',
            coinname: coinl.cryptoCurrency.symbol,
            url: 'https://source.unsplash.com/random/720x480',
            price: ((0 + Math.round(Rand * RangePrice)) / 1000)
        };


        const assets = projecttemp;

        const date = randomDate();

        const status = 'ongoing';

        var contents = ['ssss'];
        const content = contents[Math.floor(Math.random() * contents.length)];


        var canister = random.uuid();
        var re = /,/gi;
        canister = canister.split("-", 4).toString().replace(re, "-") + '-cai';

        const mailedby = 'dfinity.dmail.ai';
        const signedby = 'dmail.ai';
        const sender = canister + '@' + mailedby;

        const tags = "AirDrop";
        const price = (0 + Math.floor(Math.random() * Rangewin)) / 10000;
        const total = (0 + Math.floor(Math.random() * Rangewtotal));
        const type = 'coin';

        return {
            id,
            name: assets.name,
            projecttitle: assets.projectName,
            canister: canister,
            mailedby: mailedby,
            signedby: signedby,
            content: content,
            tags: tags,
            price: price,
            total: total,
            assets: assets,
            status: status,
            type: type,
        };
    });
};
