System.config({
  packages: {
    appBuilt: {
      format: 'register',
      defaultExtension: 'js'
    }
  }
});
Promise.all([
	System.import('dist/test/user.spec.js'),
	System.import('dist/test/todo.spec.js')
])
.then(window.onload)
.catch(console.error.bind(console));
