
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});
Parse.Cloud.define('getCsv', function(req, res) {
	for (var i = req.params.length - 1; i >= 0; i--) {
		console.log('-----', req.params[i]);
	};
  if(!req.params.start_time){
    return res.error(req.params);
  }
  if(!req.params.end_time){
    return res.error("end_time param not found");
  }
  console.log(req.params.start_time, '---', req.params.end_time);
  var queryMyClass = new Parse.Query("BioHex");
  queryMyClass.limit(10);
	queryMyClass.find(
	{
	    success:function(objects)
	    {
	        console.log("MyClass.find succeeded with objects.length = " + objects.length);
	},
	    error:function(error)
	    {
	        console.error("MyClass.find failed. error = " + error);
	    }
	});

});
