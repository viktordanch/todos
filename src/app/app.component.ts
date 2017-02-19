import { Component, trigger, state, style, transition, animate, keyframes, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('focusPanel', [
      state('inactive', style({
        transform: 'scale(1)'
      })),
      state('active', style({
        transform: 'scale(1.04)'
      })),
      transition('inactive => active', animate('500ms ease-in')),
      transition('active => inactive', animate('500ms ease-out'))
    ]),
    trigger('note', [
      state('inactive', style({
        opacity: '0'
      })),
      state('active', style({
        opacity: '1'
      })),
      transition('inactive => active',
        animate(300, keyframes([
          style({opacity: 0, transform: 'translateY(0)', offset: 0}),
          style({opacity: 1, transform: 'translateY(-15px)', offset: 0.6}),
          style({opacity: 1, transform: 'translateY(0)', offset: 1})
        ]))
      ),
      transition('active => inactive',
        animate(300, keyframes([
          style({opacity: 1, transform: 'translateY(0)', offset: 0}),
          style({opacity: 1, transform: 'translateY(-15px)', offset: 0.7}),
          style({opacity: 0, transform: 'translateY(100%)', offset: 1})
        ]))
      )
    ]),
    trigger('itemEnter', [
      state('in', style({ transform: 'translateY(-100%)', opacity: 0 })),

      transition('void => *', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('300ms ease-out'),
      ]),
      transition('* => void', [
        animate('300ms ease-out', style({transform: 'scaleY(0) translateY(200px)'})),
      ])
    ])
  ]
})
export class AppComponent {
  state: string = 'inactive';

  ourItems = [
    'start the new app project',
    'Work on blog',
    'Lunch at 1'
  ]

  submitItem (event) {
    this.ourItems.push(event.target.value);
    event.target.value = '';
  }
  removeItem (event, index) {
    this.ourItems.splice(index, 1)
  }

  toggleFocus() {
    this.state = (this.state === 'inactive' ? 'active' : 'inactive')
    console.log('toggle focus', this.state)
  }

}
