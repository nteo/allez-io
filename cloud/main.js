
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
  query.find().then(function(datas){
		Parse._.each(function(result){
        	console.log("result:", result);
        	console.log("result:", result.sensorData);
        
    	});
		return res.success(datas);
/*	
	{
	    success:function(datas)
	    {
	    	
		var csv="Heart Rate,Max Heart Rate,Average Heart Rate,Speed,Max Speed,Average Speed,Cadence,Max Cadence,Average Cadence,Power,Average Power,Max Power,Moving Time,Total Moving Time,getDistance,Total Distance,GPSStatus,GPSLatitude,"+
		"GPSLongitude,GPSSpeed,GPSAltitude,GPSTimeUTC,GPSdateUTC,Elevation,TotalElevation,Ax,Ay,Az,Gx,Gy,Gz,Mx,My,Mz,Grade,Temperature,WindSPeed,MaxWindSpeed,AverageWindSpeed,WindDirection\n";
		
		
		for (var i = 0; i<datas.length; i++) {
			console.log(datas[i]);
			/*
			var splitData = datas[i].result.sensorData.match(/.{1,16}/g);
			for (var j = 0; j<splitData.length; j++) {
				var test = Buffer(splitData[j], 'hex').readDoubleBE(0);
				csv+=Buffer(splitData[j], 'hex').readDoubleBE(0)+',';
				console.log(j, ' -- ', test);
			}
			csv+='\n';
			
		}
		
	    	//var csvBlob = json2csv(jsonBlob);
			//res.writeHead(200, {'Content-Type': 'text/csv' });
			//res.end('csvBlob;sssss');
			console.log(datas[0].sensorData);
			console.log(datas[0].result);
	        return res.success(datas[0]);
	},
	    error:function(error)
	    {
	        console.error("MyClass.find failed. error = " + error);
	        return res.error(error);
	    }
	});
*/
});
});

