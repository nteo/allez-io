
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});
Parse.Cloud.define('getCsv', function(req, res) {
	console.log('trying to get ... ', req.params);
	for (var i = req.params.length - 1; i >= 0; i--) {
		console.log('-----', req.params[i]);
	};
  if(!req.params['start_time']){
    //return res.error(req.params);
    console.log('notime start')
  }
  if(!req.params.end_time){
    console.log('notime start')
  }
  console.log(req.params['start_time'], '---', req.params.end_time);
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
