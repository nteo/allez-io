
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});
Parse.Cloud.define('getCsv', function(req, res) {
	console.log('trying to get ... ', req.params);
	for (var i = req.body.length - 1; i >= 0; i--) {
		console.log('-----', req.body[i]);
	};
  if(!req.body.start_time){
    //return res.error(req.params);
    console.log('notime start')
  }
  if(!req.body.end_time){
    console.log('notime start')
  }
  console.log(req.body.start_time, '---', req.body.end_time);
  var queryMyClass = new Parse.Query("BioHex");
  queryMyClass.limit(10);
	queryMyClass.find(
	{
	    success:function(objects)
	    {
	        return res.success(objects);
	},
	    error:function(error)
	    {
	        console.error("MyClass.find failed. error = " + error);
	        return res.error(error);
	    }
	});

});
