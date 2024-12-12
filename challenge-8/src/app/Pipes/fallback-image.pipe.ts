import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fallbackImage',
  standalone: true,
})
export class FallbackImagePipe implements PipeTransform {
  transform(imageUrl: string | null, fallbackImageUrl: string): string {
    return imageUrl !== null ? imageUrl : fallbackImageUrl;
  }
}
