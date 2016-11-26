/**
 * Card
 */
export class Card {
    public title: string;
    public description: string;
    public dt: string;

    constructor(title: string, description: string, dt: string) {
        this.title = title;
        this.description = description;
        this.dt = dt;
    }
}