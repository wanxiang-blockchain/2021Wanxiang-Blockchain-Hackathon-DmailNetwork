import { random, internet, name, system } from 'faker/locale/en';
import isAfter from 'date-fns/is_after';
import subDays from 'date-fns/sub_days';

import t1 from '../assets/test/t1.jpg';
import t2 from '../assets/test/t2.jpg';
import t3 from '../assets/test/t3.jpg';
import t4 from '../assets/test/t4.jpg';

import p1 from '../assets/test/p1.jpg';
import p2 from '../assets/test/p2.jpg';
import p3 from '../assets/test/p3.jpg';
import p4 from '../assets/test/p4.jpg';
import p5 from '../assets/test/p5.jpg';

import {
    randomDate,
    randomFloat,
    weightedArrayElement,
    weightedBoolean,
} from './utils';

export default (db, options) => {
    const { serializeDate } = options;
    const today = new Date();
    const aMonthAgo = subDays(today, 30);
    const realCustomers = db.customers.filter(customer => customer.has_ordered);

    return Array.from(Array(15).keys()).map(index => {
        const id = Math.floor(Math.random() * 100000);
        const thumbs = [t1, t2, t3, t4];
        const thumb = thumbs[Math.floor(Math.random() * thumbs.length)];
        const pics = [p1, p2, p3, p4, p5];
        const pic = pics[Math.floor(Math.random() * pics.length)];
        const isEmail = Math.random() > 0.5;
        const price = Math.floor(Math.random() * 100);
        const dollar = price * 3010;

        const descriptions = ['One Black and White ArrowLight BlueTwo Triangles and One Arrow of Light Yellow on the Left and Medium Yellow on the RightBlack Triangular Eyes on an Light Yellow Background', 'After more than 60 years away from Formula One, Aston Martin returns to Grand Prix racing in 2021 as the Aston Martin Cognizant Formula One™ Team....', 'There are only about 50 known copies of the T206 Wagner, the undisputed "Mona Lisa" of baseball cards.', 'An Entertainment Icon, Snoop Dogg has reigned for more than two decades as an unparalleled force who has raised the bar as an entertainer and global...', 'Crypto.com is the best place to buy, sell, and pay with crypto. Crypto.com serves over 10 million customers today, with the world’s fastest growing crypt...'];
        const description = descriptions[Math.floor(Math.random() * descriptions.length)];
        const customer = random.arrayElement<any>(realCustomers);
        const date = randomDate(customer.first_seen, customer.last_seen);
        const time = `${Math.floor(Math.random() * 10)} days left !`

        const introductions = ["At present, NFT is mainly used to encrypt the issuance and circulation of works of art, virtual land, game props, tickets and other fields. NFT market zone is the basic platform to support the auction and secondary sale of NFT assets.", "Wagner himself is the reason for the card's rarity. Apparently, the Pittsburgh Pirates star barred the American Tobacco Company from continuing production of the card — either because he didn't want children to buy cigarettes to acquire his card or because he wanted to get paid more for his likeness.", 'At a very high level, most NFTs are part of the Ethereum blockchain. Ethereum is a cryptocurrency, like bitcoin or dogecoin, but its blockchain also supports these NFTs, which store extra information that makes them work differently from, say, an ETH coin. It is worth noting that other blockchains can implement their own versions of NFTs.', 'NFTs can really be anything digital (such as drawings, music, your brain downloaded and turned into an AI), but a lot of the current excitement is around using the tech to sell digital art.', 'NFTs are designed to give you something that can’t be copied: ownership of the work (though the artist can still retain the copyright and reproduction rights, just like with physical artwork). To put it in terms of physical art collecting: anyone can buy a Monet print. But only one person can own the original.'];
        const introduction = introductions[Math.floor(Math.random() * introductions.length)];

        const status =
            isAfter(date, aMonthAgo) && random.boolean()
                ? 'auction'
                : weightedArrayElement(['auction', 'sell', 'my'], [10, 10, 10]);

        var titles: string[];
        titles = ["Grand Prize Raffle Tickets",
            "3D Kittyfoot",
            "Kitty Hendrikz",
            "Ankle Breakers",
            "Neon Dreams"]
        const subject = titles[Math.floor(Math.random() * titles.length)];

        const creators = ['Davis', 'Garcia', 'Wilson', 'Anderson', 'Jackson']
        const creator = creators[Math.floor(Math.random() * creators.length)];

        return {
            id,
            subject,
            pic,
            thumb,
            isEmail,
            price,
            dollar,
            ava: 'https://source.unsplash.com/random/70x70',
            creator,
            description,
            introduction,
            date: serializeDate ? date.toISOString() : date,
            time,
            status,
            returned: weightedBoolean(10),
        };
    });
};
