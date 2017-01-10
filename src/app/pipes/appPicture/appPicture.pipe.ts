import { Pipe, PipeTransform } from '@angular/core';
import { paths } from '../../app.constants';

@Pipe({ name: 'appPicture' })
export class AppPicturePipe implements PipeTransform {

    transform(input: string): string {
        return paths.images.root + input;
    }
}
