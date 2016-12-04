/**
 * Board
 */
export class Board {
    public title: string;
    public description: string;
    public dt: string;
    public code: string;
    public color: string;

    constructor();
    constructor(data: Board); 
    constructor(data?: any) {
        if (data) {
            this.title = data.title || null;
            this.dt = data.dt || null;
            this.code = data.code || null;
            if (data.color) {
                if (data.color.rgb) {
                    this.color = data.color.rgb || null;
                } else {
                    this.color = data.color || null;
                }
            }
        }
    }
}