System.config({
  packages: {
    appBuilt: {
      format: 'register',
      defaultExtension: 'js'
    }
  }
});

//global import((_authService.getAuth))
System.import('appBuilt/app.component').then(null, console.error.bind(console));