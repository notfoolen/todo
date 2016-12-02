/**
 * CardReorderView
 */
export class CardReorderView {
    
    public deskId: number;
    public cardsIds: number[];

    constructor(deskId: number, cardsIds: number[]) {
        this.deskId = deskId;
        this.cardsIds = cardsIds;
    }

}