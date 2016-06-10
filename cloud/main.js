
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
  var query = new Parse.Query("BioHex");
  query.limit(100);
  query.greaterThanOrEqualTo( "updatedAt", req.params.end_time);
	query.find(
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
