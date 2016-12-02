/**
 * Card
 */
export class Card {
    public id: number;
    public title: string;
    public dt: Date;
    public order: number;
    public deskId: number;

    constructor();
    constructor(data: Card); 
    constructor(data?: any) {
        if (data) {
            this.id = data.id || null;
            this.title = data.title || null;
            this.dt = data.dt || null;
            this.order = data.order || null;
            this.deskId = data.deskId || null;
        }
    }
}