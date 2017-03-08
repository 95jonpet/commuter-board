import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
        <div class="pure-g">
            <div class="pure-u-1-3">
                <div class="panel">
                    <div class="panel--header">
                        <i class="fa fa-fw fa-info-circle"></i> Panel
                    </div>
                    <div class="panel--contents">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </div>
                </div>
            </div>
        </div>
    `,
})
export class AppComponent  { name = 'Angular'; }
