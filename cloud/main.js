
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});
Parse.Cloud.define('getCsv', function(req, res) {
	console.log('trying to get ... ', req.params);
	console.log('trying to get ... ', req.body);
/*	
  if(!req.params['start_time']){
    //return res.error(req.params);
    console.log('notime starst')
  }
  if(!req.params.end_time){
    console.log('notime end')
  }
  */
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
