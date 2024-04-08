import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'markdownFormatter',
  standalone: true
})
export class markdownFormatter implements PipeTransform {



  transform(value: string[], ...args: unknown[]): string {

    let descriptions = value;
    let str = descriptions.reduce((prev, curr, idx, full) => {
      let returnValue;
      if (full[idx - 1].match(/\|.*\|/) && curr.match(/\|.*\|/)) {
        returnValue = prev + "\n" + curr;
      } else {
        returnValue = prev + "\n\n" + curr;
      }
      return returnValue;
    })

    str = str.replaceAll(/(#####)\s*(.*)/g, "**$2**");
    str = str.replaceAll("***", "**");
    str = str.replaceAll(/(\d{1,3}d\d{1,3})/g, "**$1**")
    str = str.replaceAll(/(\+\d{1,3} to hit)/g, "**$1**")
    return str;
  }

}
