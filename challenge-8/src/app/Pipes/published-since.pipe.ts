import { Pipe, PipeTransform } from '@angular/core';
import { TimePeriod } from '../Models/time-period.enum';

@Pipe({
  name: 'publishedSince',
  standalone: true
})
export class PublishedSincePipe implements PipeTransform {

  transform(publishedAt: string, timePeriod: TimePeriod): string {
    // if (!publishedAt) return ''
    const publishedDate = new Date(publishedAt);
    const now = new Date();
    const differenceInMilliseconds = now.getTime() - publishedDate.getTime();

    switch (timePeriod) {
      case TimePeriod.YEARS: {
        const years = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365));
        return `${years} year${years !== 1 ? 's' : ''} ago`;
      }
      case TimePeriod.MONTHS: {
        const months = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24 * 30));
        return `${months} month${months !== 1 ? 's' : ''} ago`;
      }
      case TimePeriod.DAYS: {
        const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
        return `${days} day${days !== 1 ? 's' : ''} ago`;
      }
      default:
        return '';
    }
  }

}
