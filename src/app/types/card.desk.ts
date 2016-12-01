import { Card } from './card';

/**
 * CardDesk
 */
export class CardDesk {
    public title: string;
    public dt: string;
    public order: number;
    public items: Card[];

    constructor(title: string, dt: string, order: number) {
        this.title = title;
        this.dt = dt;
        this.order = order;
        this.items = [];
    }
}