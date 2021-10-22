import { ReduxState, Record, Identifier } from 'react-admin';

export type ThemeName = 'red' | 'light' | 'dark';

export interface AppState extends ReduxState {
    theme: ThemeName;
    email: string;
}

export interface Category extends Record {
    name: string;
}

export interface Product extends Record {
    category_id: Identifier;
    description: string;
    height: number;
    image: string;
    price: number;
    reference: string;
    stock: number;
    thumbnail: string;
    width: number;
}

export interface Attach extends Record {
    name: string,
    content: Text,
    type: string,
    thumbnail: string,
    url: string,
}

export interface Customer extends Record {
    first_name: string;
    last_name: string;
    address: string;
    canister: string;
    stateAbbr: string;
    city: string;
    zipcode: string;
    avatar: string;
    birthday: string;
    first_seen: string;
    last_seen: string;
    has_ordered: boolean;
    latest_purchase: string;
    has_newsletter: boolean;
    groups: string[];
    nb_commands: number;
    total_spent: number;
}

export type MailStatus = 'primary' | 'other' | 'subscription' | 'junk' | 'del' | 'sent'

export interface Mail extends Record {
    status: MailStatus;
    basket: BasketItem[];
    attachs: [];
    date: Date;
    total: number;
}


export interface Junk extends Record {
    status: MailStatus;
    basket: BasketItem[];
    date: Date;
    total: number;
}

export interface Sent extends Record {
    status: MailStatus;
    basket: BasketItem[];
    date: Date;
    total: number;
}

export interface Trash extends Record {
    status: MailStatus;
    basket: BasketItem[];
    date: Date;
    total: number;
}

export type NftStatus = 'auction' | 'sell' | 'my'
export interface Nft extends Record {
    status: NftStatus;
    basket: BasketItem[];
    date: Date;
    total: number;
}

export type OrderStatus = 'ordered' | 'delivered' | 'cancelled';

export interface Order extends Record {
    status: OrderStatus;
    basket: BasketItem[];
    date: Date;
    total: number;
}

export type ProjectStatus = 'information' | 'attetion';

export interface Project extends Record {
    status: ProjectStatus;
    onlinedate: Date;
    total: number;
}

export type AssetStatus = 'ongoing' | 'ended';

export interface Asset extends Record {
    status: AssetStatus;
    total: number;
}

export interface BasketItem {
    product_id: Identifier;
    quantity: number;
}

export interface Invoice extends Record { }

export type ReviewStatus = 'accepted' | 'pending' | 'rejected';

export interface Review extends Record {
    date: Date;
    status: ReviewStatus;
    customer_id: Identifier;
    product_id: Identifier;
}

declare global {
    interface Window {
        restServer: any;
    }
}
