System.config({
  packages: {
    appBuilt: {
      format: 'register',
      defaultExtension: 'js'
    }
  }
});
System.import('appBuilt/app.component')
      .then(null, console.error.bind(console));