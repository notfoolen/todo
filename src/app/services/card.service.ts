import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app.constants';
import { Card, CardDesk } from '../types';
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
                    res.push(item);
                }
                return res;
            });
    }

    public AddCard = (title: string): Observable<Card> => {
        let params = {
            title: title
        };
        return this._baseService.Post("cards", params)
            .map((resp: Response) => {
                let data = resp.json();
                return new Card(data.title, data.dt, data.order);
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
                    res.push(item);
                }
                return res;
            });
    }

    public AddCardDesk = (title: string): Observable<CardDesk> => {
        let params = {
            title: title
        };
        return this._baseService.Post("desks", params)
            .map((resp: Response) => {
                let data = resp.json();
                return new CardDesk(data.title, data.dt, data.order);
            });
    }

}