import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app.constants';
import { Board } from '../types';
import { BaseService } from './base.service';


@Injectable()
export class BoardService {

    constructor(private _baseService: BaseService) {
    }

    public GetList = (): Observable<Board[]> => {
        return this._baseService.Get("boards")
            .map((resp: Response) => {
                let data = resp.json();
                let res: Board[] = [];
                for (var item of data) {
                    res.push(item);
                }
                return res;
            });
    }

    public Add = (title: string, description: string): Observable<Board> => {
        let params = {
            title: title,
            description: description,
        };
        return this._baseService.Post("boards", params)
            .map((resp: Response) => {
                let data = resp.json();
                return new Board(data.title, data.description, data.dt);
            });
    }

}