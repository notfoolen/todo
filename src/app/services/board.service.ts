import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app.config';
import { Board } from '../types';
import { BaseService } from './base.service';


@Injectable()
export class BoardService {

    constructor(private _baseService: BaseService) {
    }

    public Get = (code: string): Observable<Board> => {
        return this._baseService.Get("boards/" + code)
            .map((resp: Response) => {
                let data = resp.json();
                return new Board(data);
            });
    }

    public GetList = (): Observable<Board[]> => {
        return this._baseService.Get("boards")
            .map((resp: Response) => {
                let data = resp.json();
                let res: Board[] = [];
                for (var item of data) {
                    res.push(new Board(item));
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
                return new Board(data);
            });
    }

    public DeleteBoard = (code: string): Observable<Boolean> => {
        return this._baseService.Delete("boards", code)
            .map((resp: Response) => {
                return true;;
            });
    }

}