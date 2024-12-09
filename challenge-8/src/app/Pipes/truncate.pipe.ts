import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
 name: 'truncate',
 standalone: true,
})
export class TruncatePipe implements PipeTransform {
    transform(name: string, maxLength: number = 10): string {
        if (!name) return '';
        return name.length > maxLength ? name.slice(0, maxLength) + '...' : name;
    }
}