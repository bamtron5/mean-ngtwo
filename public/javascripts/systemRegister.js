System.config({
  packages: {
    appBuilt: {
      format: 'register',
      defaultExtension: 'js'
    }
  }
});
System.import('appBuilt/main')
      .then(null, console.error.bind(console));