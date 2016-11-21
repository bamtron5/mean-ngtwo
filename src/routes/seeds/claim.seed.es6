var Claim = require('../models/claim');
var Support = require('../models/support');

Claim.remove({}, function(err){
  if(err){
    console.log(err);
  }
});

Support.remove({}, function(err){
  if(err){
    console.log(err);
  }
});

//new test data declared
var newClaim = [
  new Claim({
    'slug':'claim-one',
    'title':'Claim One',
    'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac metus libero. Vivamus nec sem sit amet diam venenatis sodales non et nibh. Proin vel eros leo. Ut et euismod nulla, eu lobortis libero. Cras gravida dignissim ex nec blandit. Donec nibh tortor, faucibus a urna eu, fringilla pulvinar odio. Cras placerat lacus id nulla fermentum dapibus. Curabitur pellentesque consectetur diam, convallis elementum lacus. Praesent pretium pharetra felis eget interdum. Vestibulum interdum, dolor sed bibendum auctor, orci elit ullamcorper ligula, eu dapibus arcu orci in mi. Vestibulum non rutrum velit.Duis eu fringilla felis. Aliquam egestas ex felis, quis blandit risus consequat eu. Etiam in lacus ipsum. Nulla ut libero mi. Sed non nisl sit amet dolor varius tincidunt at et felis. Mauris luctus sollicitudin lectus, sit amet fringilla orci venenatis ac. Aenean sed arcu eget neque sollicitudin commodo quis eleifend eros. Nulla ultricies, purus at pharetra rutrum, dui enim blandit eros, nec sodales lectus justo sit amet erat. Sed quis dolor eu purus imperdiet mollis. Integer efficitur massa dapibus ante tempor, sit amet gravida dui feugiat. Nullam condimentum porta tincidunt. Aliquam erat leo, finibus sit amet velit ut, molestie fermentum neque. Aliquam velit massa, lobortis a velit id, euismod aliquam nisi. Aenean eu mauris ac mauris bibendum viverra at quis nisi. Pellentesque placerat elit eu hendrerit tincidunt. Morbi bibendum iaculis bibendum. Curabitur consequat mi lacus, et dictum sapien ultrices sed. Donec mollis enim nec mollis aliquam. Etiam nisi dolor, tempor at sapien at, iaculis vehicula lorem. Proin eget sapien ut mauris tristique dignissim vitae vitae nulla. Integer quis tortor pretium nunc aliquet varius.',
    'tags': ['Claim One','Video Games', 'March']
  }),
  new Claim({
    'slug':'claim-two',
    'title':'Claim Two',
    'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae elit interdum, accumsan neque quis, auctor urna. Vestibulum non leo tincidunt, luctus metus sit amet, faucibus arcu. Nunc ultrices dignissim consequat. Praesent posuere venenatis erat, in bibendum mi ultricies et. Donec non libero vel dolor vehicula fermentum at et nunc. Ut finibus magna eget pharetra porta. In a quam congue turpis blandit gravida. Suspendisse porta facilisis risus vel luctus. Praesent vestibulum nunc at nunc luctus, ac rhoncus nulla fermentum. Etiam id augue nisl. Curabitur imperdiet elit urna, at blandit lectus interdum eu.Etiam vel metus lorem. Fusce egestas massa purus, et euismod urna fermentum at. Vivamus dignissim mi in blandit aliquet. Donec a lacinia augue, at interdum nisl. Pellentesque lacinia commodo lectus nec lacinia. Proin magna orci, gravida quis nisi in, malesuada accumsan ligula. Cras blandit quam a imperdiet fringilla. Praesent nec cursus ipsum. Vivamus tortor enim, tincidunt sit amet ante eget, pulvinar bibendum diam. Aenean cursus suscipit nisi id porta. Proin vel neque sit amet quam laoreet tincidunt a id dolor.',
    'tags': ['Claim Two','Michael Jackson', 'Sopranos']
  })
];

var newSupport = [
  new Support({
    'claimKey':'Claim One',
    'name':'Support name One',
    'supportOrDeny': true
  }),
  new Support({
    'claimKey':'Claim Two',
    'name':'Support name Two',
    'supportOrDeny': false

  })
];

newClaim.map((Claim) => {
  Claim.save(function(err){
    if(err){
      console.log(err);
      throw err;
    }
  });
});

newSupport.map((Support) => {
  Support.save(function(err){
    if(err){
      console.log(err);
      throw err;
    }
  });
});
