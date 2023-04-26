import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

@Pipe({
  name: 'dateFromNow'
})
export class DateFromNowPipe implements PipeTransform {



  transform(value: string, ...args: any[]): string {
    let date = value.slice(0,10);
    return dayjs(date).fromNow();
  }

}
