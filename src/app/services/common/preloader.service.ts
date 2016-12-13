import {Injectable} from '@angular/core';

@Injectable()
export class Preloader {

  private static _loaders:Array<Promise<any>> = [];

  public static registerLoader(method:Promise<any>):void {
    Preloader._loaders.push(method);
  }

  public static clear():void {
    Preloader._loaders = [];
  }

  public static load():Promise<any> {
    return new Promise((resolve, reject) => {
      Preloader._executeAll(resolve);
    });
  }

  private static _executeAll(done:Function):void {
    setTimeout(() => {
      Promise.all(Preloader._loaders).then((values) => {
        done.call(null, values);

      }).catch((error) => {
        console.error(error);
      });
    });
  }
}
