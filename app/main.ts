import {bootstrap}    from 'angular2/platform/browser'
import {AppComponent} from './app.component'
import {HeroFormComponent} from './hero-form.component'
import 'rxjs/Rx' //operators for es6 ... wtf

bootstrap(AppComponent);
bootstrap(HeroFormComponent);