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


    str = str.replaceAll(/(acid)/g, "<span class='$1'>$1</span>")
    str = str.replaceAll(/(bludgeoning)/g, "<span class='$1'>$1</span>")
    str = str.replaceAll(/(cold)/g, "<span class='$1'>$1</span>")
    str = str.replaceAll(/(\s(fire)\w*)/g, "<span class='$2'>$1</span>")
    str = str.replaceAll(/(force)/g, "<span class='$1'>$1</span>")
    str = str.replaceAll(/(lightning)/g, "<span class='$1'>$1</span>")
    str = str.replaceAll(/((necro)\w*)/g, "<span class='$2'>$1</span>")
    str = str.replaceAll(/(piercing)/g, "<span class='$1'>$1</span>")
    str = str.replaceAll(/((poison)\w*)/g, "<span class='$2'>$1</span>")
    str = str.replaceAll(/(psychic)/g, "<span class='$1'>$1</span>")
    str = str.replaceAll(/(radiant)/g, "<span class='$1'>$1</span>")
    str = str.replaceAll(/(slashing)/g, "<span class='$1'>$1</span>")
    str = str.replaceAll(/((thunder)\w*)/g, "<span class='$2'>$1</span>")



    str = str.replaceAll(/(#####)\s*(.*)/g, "**$2**");
    str = str.replaceAll("***", "**");
    str = str.replaceAll(/(\d{1,3}d\d{1,3})/g, "**$1**")
    str = str.replaceAll(/(\+\d{1,3} to hit)/g, "**$1**")
    return str;
  }

}
