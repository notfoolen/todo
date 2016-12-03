import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app.constants';
import { Card, CardDesk, CardReorderView } from '../types';
import { BaseService } from './base.service';

@Injectable()
export class CardService {

    constructor(private _baseService: BaseService) {
    }

    public GetCardList = (): Observable<Card[]> => {
        return this._baseService.Get("cards")
            .map((resp: Response) => {
                let data = resp.json();
                let res: Card[] = [];
                for (var item of data) {
                    res.push(new Card(item));
                }
                return res;
            });
    }

    public AddCard = (item: Card): Observable<Card> => {
        return this._baseService.Post("cards", item)
            .map((resp: Response) => {
                let data = resp.json();
                return new Card(data);
            });
    }

    public EditCard = (item: Card): Observable<Card> => {
        return this._baseService.Put("cards", item)
            .map((resp: Response) => {
                let data = resp.json();
                return new Card(data);
            });
    }

    public DeleteCard = (id: number): Observable<Card> => {
        return this._baseService.Delete("cards", id)
            .map((resp: Response) => {
                let data = resp.json();
                return new Card(data);
            });
    }

    public ReorderCards = (desks: CardReorderView[]): Observable<boolean> => {
        return this._baseService.Post("cards/reorder", desks)
            .map((resp: Response) => {
                return true;
            });
    }

    public GetDeskList = (code: string): Observable<CardDesk[]> => {
        let params = {
            code: code
        };
        return this._baseService.Get("desks", params)
            .map((resp: Response) => {
                let data = resp.json();
                let res: CardDesk[] = [];
                for (var item of data) {
                    res.push(new CardDesk(item));
                }
                return res;
            });
    }

    public AddDesk = (title: string, code: string): Observable<CardDesk> => {
        let params = {
            title: title,
            code: code,
        };
        return this._baseService.Post("desks", params)
            .map((resp: Response) => {
                let data = resp.json();
                return new CardDesk(data);
            });
    }

    public EditDesk = (item: Card): Observable<Card> => {
        return this._baseService.Put("desks", item)
            .map((resp: Response) => {
                let data = resp.json();
                return new Card(data);
            });
    }

    public DeleteDesk = (id: number): Observable<Card> => {
        return this._baseService.Delete("desks", id)
            .map((resp: Response) => {
                let data = resp.json();
                return new Card(data);
            });
    }

    public ReorderDesks = (ids: number[]): Observable<boolean> => {
        return this._baseService.Post("desks/reorder", ids)
            .map((resp: Response) => {
                return true;
            });
    }

}