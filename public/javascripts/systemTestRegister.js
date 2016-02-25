System.config({
  packages: {
    appBuilt: {
      format: 'register',
      defaultExtension: 'js'
    }
  }
});
Promise.all([
	System.import('appBuilt/test/user.spec.js'),
	System.import('appBuilt/test/todo.spec.js')
])
.then(window.onload)
.catch(console.error.bind(console));
