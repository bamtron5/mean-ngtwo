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
System.import('appBuilt/app.component').then(null, console.error.bind(console));