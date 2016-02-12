System.config({
  packages: {
    appBuilt: {
      format: 'register',
      defaultExtension: 'js'
    }
  }
});

System.import('appBuilt/test/spec/user.spec.js').then(null, console.error.bind(console));
