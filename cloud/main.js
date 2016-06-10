
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});
Parse.Cloud.define('getCsv', function(req, res) {
  if(!req.params.start_time){
    return res.error("no start_time");
  }
  if(!req.params.end_time){
    return res.error("no end_time");
  }
  
  console.log(req.params['start_time'], '---', req.params.end_time);
  var queryMyClass = new Parse.Query("BioHex");
  queryMyClass.limit(100);
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
