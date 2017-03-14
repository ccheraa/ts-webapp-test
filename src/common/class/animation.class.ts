import { trigger, transition, style, animate } from '@angular/core';
export const animFade = function(name: string, duration = 160): any {
  return trigger( name, [
    transition(':enter', [style({opacity: 0}), animate(duration + 'ms', style({opacity: 1}))]),
    transition(':leave', [style({opacity: 1}), animate(duration + 'ms', style({opacity: 0}))])
  ]);
};
