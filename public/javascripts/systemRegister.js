System.config({
  packages: {
    dist: {
    	app:{
			format: 'register',
      		defaultExtension: 'js'
    	}
    }
  }
});

//global import((_authService.getAuth))
System.import('dist/app/components/app.component').then(null, console.error.bind(console));