System.config({
  packages: {
    appBuilt: {
      format: 'register',
      defaultExtension: 'js'
    }
  }
});

//global import((_authService.getAuth))
System.import('appBuilt/desktop.nav.component').then(null, console.error.bind(console));

switch (document.location.pathname){
	case '/':
		System.import('appBuilt/app.component').then(null, console.error.bind(console));
		break;
	case '/login':
		System.import('appBuilt/login.form.component').then(null, console.error.bind(console));
    break;
  case '/profile':
    System.import('appBuilt/profile.component').then(null, console.error.bind(console));
    break;
}
