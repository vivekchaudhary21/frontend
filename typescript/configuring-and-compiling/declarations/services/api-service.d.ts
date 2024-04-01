export type Concert = {
    id: string;
    name: string;
    date: Date | string;
    ticketsPrinted?: number;
    ticketsSold?: number;
};
export type Session = {
    token: string;
    username: string;
};
export declare const getConcerts: () => Promise<Concert[]>;
export declare const automatedLogin: () => Promise<Session>;
