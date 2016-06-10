
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
  query.limit(1000);
  query.lessThanOrEqualTo( "updatedAt", new Date(req.params.end_time));
  query.greaterThanOrEqualTo( "updatedAt", new Date(req.params.start_time));
	query.find(
	{
	    success:function(objects)
	    {
	    	//var csvBlob = json2csv(jsonBlob);
			//res.writeHead(200, {'Content-Type': 'text/csv' });
			//res.end('csvBlob;sssss');
	        return res.success(objects);
	},
	    error:function(error)
	    {
	        console.error("MyClass.find failed. error = " + error);
	        return res.error(error);
	    }
	});

});
