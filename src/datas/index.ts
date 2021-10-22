import { Record } from 'ra-core';

import generateCustomers from './customers';
import generateCategories from './categories';
import generateProducts from './products';
import generateCommands from './commands';
import generateInvoices from './invoices';
import generateReviews from './reviews';
import generateMails from './mails';
import generateJunks from './junks';
import generateSents from './sents';
import generateTrashs from './trashs';
import generateProjects from './projects';
import generateAssets from './assets';
import generateNft from './nfts';


import finalize from './finalize';

export interface Db {
    customers: Record[];
    categories: Record[];
    products: Record[];
    commands: Record[];
    invoices: Record[];
    reviews: Record[];
    mails: Record[];
    junks: Record[];
    sents: Record[];
    trashs: Record[];
    projects: Record[];
    assets: Record[];
    nfts: Record[];
}

export default (options = { serializeDate: true }): Db => {
    const db = {} as Db;
    db.customers = generateCustomers(db, options);
    db.categories = generateCategories();
    db.products = generateProducts(db);
    db.commands = generateCommands(db, options);
    db.invoices = generateInvoices(db);
    db.reviews = generateReviews(db, options);
    db.mails = generateMails(db, options);
    db.junks = generateJunks(db, options);
    db.sents = generateSents(db, options);
    db.trashs = generateTrashs(db, options);
    db.projects = generateProjects(db, options);
    db.assets = generateAssets(db, options);
    db.nfts = generateNft(db, options);


    finalize(db);

    return db;
};
