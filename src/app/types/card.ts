/**
 * Card
 */
export class Card {
    public title: string;
    public dt: string;
    public order: number;

    constructor(title: string, dt: string, order: number) {
        this.title = title;
        this.dt = dt;
        this.order = order;
    }
}