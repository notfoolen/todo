/**
 * Board
 */
export class Board {
    public title: string;
    public description: string;
    public dt: string;
    public code: string;

    constructor(title: string, description: string, dt: string, code: string) {
        this.title = title;
        this.description = description;
        this.dt = dt;
        this.code = code;
    }
}