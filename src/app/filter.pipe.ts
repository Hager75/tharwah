import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url:string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(va);
  // }

}
