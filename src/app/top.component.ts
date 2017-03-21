import { Component, Input } from '@angular/core';

@Component({
    selector: 'top',
    template: `
        <header class="header">
            <div class="wrapper">
                <div class="pure-g">
                    <div class="pure-u-1 pure-u-md-1-2">
                        <h1 class="title">{{ name }}</h1>
                    </div>
                    <div class="pure-u-1 pure-u-md-1-2">
                        <div class="toolbar">
                            <i class="fa fa-plus"></i>
                            <i class="fa fa-pencil"></i>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    `,
    styles: [`
        .header {
            width: 100%;
            background-color: #222;
            box-shadow: 0 5px 8px rgba(0, 0, 0, .5);
        }
        .header .title {
            color: #ccc;
            font-size: 22px;
            font-weight: 400;
            margin: 0;
        }
        .header .wrapper {
            padding: 20px 40px;
        }
        .header .toolbar {
            font-size: 22px;    
            color: #999;
            text-align: right;
        }
        .header .toolbar .fa:not(:last-child) {
            margin-right: .5em;
        }
    `]
})
export class TopComponent  {
    @Input()
    name: String;
}
