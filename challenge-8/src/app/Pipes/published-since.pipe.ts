import { Pipe, PipeTransform } from '@angular/core';
import { TimePeriod } from '../Models/time-period.enum';

@Pipe({
  name: 'publishedSince',
  standalone: true
})
export class PublishedSincePipe implements PipeTransform {

  transform(publishedAt: string , timePeriod: TimePeriod) {
    if (!publishedAt) return null;

    const now = new Date();
    const publishedDate = new Date(publishedAt);
    const differenceInMilliseconds = now.getTime() - publishedDate.getTime();

    switch (timePeriod) {
      case TimePeriod.YEARS: {
        const years = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365));
        return { value: years, key: years === 1 ? 'YEAR_AGO' : 'YEARS_AGO' };
      }
      case TimePeriod.MONTHS: {
        const months = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24 * 30));
        return { value: months, key: 'MONTHS_AGO' };
      }
      case TimePeriod.DAYS: {
        const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
        return { value: days, key: 'DAYS_AGO' };
      }
      default:
        return null;
    }
  }
}
