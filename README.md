# NG2 Mean Stack

## Release
Pre-alpha | Dev only. Contribution welcome.

## Run directions
`npm install`

then:
`DEBUG=claimBook* npm start`

## Includes	
* Authentication w/ JsonWebTokens
	- *needs testing*
* Components:
	- Nav Component
	- Todo List Component
	- Profile Component 
* Mongo Seeds (todo model, users model)
* My NG Service Boiler Plate
* Express API routes
	- *needs testing*
* Static Routing

## Future Support
Angular2 Developer Tools
- [Angular2 Developer Tools](https://github.com/angular/angular/blob/master/TOOLS_DART.md)
	- Angular debugging tools
	- Code size
	- Performance

```javascript
import 'package:angular2/platform/browser.dart';

main() async {
  var appRef = await bootstrap(Application);
  enableDebugTools(appRef);
}

//------

// In the dev console:
ng.profiler.timeChangeDetection();
```

- Server Scripts
	- `npm serve` - just serve
	- `npm run [env]` - lint / build / serve
	- `npm test [env]` - test api
	- `npm build [env]` - transpile TS / run webpack / test
	Flags
		`--watch` - watch and serve
- Webpack
	- `webpack [config]`
- Heroku Deploy
	- `heroku deploy`
- Travis CI
- Puphet like VM DEV
