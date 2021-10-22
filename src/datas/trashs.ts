import { random, internet, name, system } from 'faker/locale/en';
import isAfter from 'date-fns/is_after';
import subDays from 'date-fns/sub_days';

import {
    randomDate,
    randomFloat,
    weightedArrayElement,
    weightedBoolean,
} from './utils';

export default (db, { serializeDate }) => {
    const today = new Date();
    const aMonthAgo = subDays(today, 30);
    const realCustomers = db.customers.filter(customer => customer.has_ordered);

    return Array.from(Array(200).keys()).map(id => {
        const nbProducts = weightedArrayElement(
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            [30, 20, 5, 2, 1, 1, 1, 1, 1, 1]
        );
        const basket = Array.from(Array(nbProducts).keys()).map(() => ({
            product_id: random.number({ min: 0, max: 10 * 13 - 1 }),
            quantity: weightedArrayElement(
                [1, 2, 3, 4, 5],
                [10, 5, 3, 2, 1]
            ) as number,
        }));

        const filename = system.fileName();
        const attach1 = {
            name: random.number({ min: 0, max: 10 * 13 - 1 }),
            content: 'base64xxxxxxxxxxxxcode',
            type: 'img',
            thumbnail: 'https://source.unsplash.com/random/180x120',
            url: 'https://source.unsplash.com/random/720x480',
        };
        const attach2 = {
            name: random.number({ min: 0, max: 10 * 13 - 1 }),
            content: 'base64xxxxxxxxxxxxcode',
            type: 'img',
            thumbnail: 'https://source.unsplash.com/random/180x120',
            url: 'https://source.unsplash.com/random/720x480',
        };
        const attach3 = {
            name: random.number({ min: 0, max: 10 * 13 - 1 }),
            content: 'base64xxxxxxxxxxxxcode',
            type: 'img',
            thumbnail: 'https://source.unsplash.com/random/180x120',
            url: 'https://source.unsplash.com/random/720x480',
        };
        const attachs = [attach1, attach2, attach3];

        const total_ex_taxes = basket.reduce(
            (total, product) =>
                total +
                db.products[product.product_id].price * product.quantity,
            0
        );

        const delivery_fees = 2.00;
        const tax_rate = random.arrayElement([0.12, 0.17, 0.2]);
        const taxes = parseFloat(
            ((total_ex_taxes + delivery_fees) * tax_rate).toFixed(2)
        );
        const customer = random.arrayElement<any>(realCustomers);
        const date = randomDate(customer.first_seen, customer.last_seen);

        const status =
            isAfter(date, aMonthAgo) && random.boolean()
                ? 'trash'
                : weightedArrayElement(['trash'], [10, 1]);

        var titles: string[];
        titles = ["WelcomeToCarInsurance",
            "50lbs in 61 Days",
            "2 Days Left! Enjoy up to 30x Boost Coins!!",
            "Welcome to Apple Reward Panel",
            "Calling All Homeowners..."]
        const subject = titles[Math.floor(Math.random() * titles.length)];

        var contents: string[];
        contents = ["WelcomeToCarInsurance", "....", "000000000"]
        const content = contents[Math.floor(Math.random() * contents.length)];

        const first_name = name.firstName();
        const last_name = name.lastName();
        const sender = internet.email(first_name, last_name);
        const fullname = first_name + ' ' + last_name;
        var canister = random.uuid();
        var re = /,/gi;
        canister = canister.split("-", 4).toString().replace(re, "-") + '-cai';

        const mailedby = 'dfinity.dmail.ai'
        const signedby = 'dmail.ai'

        return {
            id,
            subject: subject,
            sender: fullname,
            sendermail: sender,
            canister: canister,
            mailedby: mailedby,
            signedby: signedby,
            content: content,
            attachs: attachs,
            reference: random.alphaNumeric(6).toUpperCase(),
            date: serializeDate ? date.toISOString() : date,
            customer_id: customer.id,
            basket: basket,
            total_ex_taxes: total_ex_taxes,
            delivery_fees: delivery_fees,
            tax_rate: tax_rate,
            taxes: taxes,
            total: parseFloat(
                (total_ex_taxes + delivery_fees + taxes).toFixed(2)
            ),
            status: status,
            returned: status === 'other' ? weightedBoolean(10) : false,
        };
    });
};
