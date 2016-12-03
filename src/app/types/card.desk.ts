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
    public code: string;

    constructor();
    constructor(data: CardDesk);
    constructor(data?: any) {
        if (data) {
            this.id = data.id || null;
            this.title = data.title || null;
            this.dt = data.dt || null;
            this.order = data.order || null;
            if (data.cards && data.cards.length > 0) {
                this.cards = data.cards;
            }
        }
    }

}