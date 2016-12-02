import { Card } from './card';

/**
 * CardDesk
 */
export class CardDesk {
    public id: number;
    public title: string;
    public dt: string;
    public order: number;
    public cards: Card[] = [];

    constructor(data: any) {
        this.id = data.id;
        this.title = data.title;
        this.dt = data.dt;
        this.order = data.order;
        if (data.cards && data.cards.length > 0) {
            this.cards = data.cards;
        }
    }

}