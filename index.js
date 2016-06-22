// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI || 'mongodb://heroku_glg4jz31:jkssvdejvs8hpltcqkgno0vicu@ds013931.mlab.com:13931/heroku_glg4jz31';

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://heroku_glg4jz31:jkssvdejvs8hpltcqkgno0vicu@ds013931.mlab.com:13931/heroku_glg4jz31',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'allezio',
  masterKey: process.env.MASTER_KEY || 'c5b2fe2f-b553-413f-b40b-8d2bc6bd11bd', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/api',  // Don't forget to change to https if needed
  liveQuery: {
    classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
  }
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/api';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('Make sure to star the parse-server repo on GitHub!');
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/test', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);

mongodb.MongoClient.connect(databaseUri, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");
  httpServer.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});
  // Initialize the app.
  
});
// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

app.get("/userBikeDatas/:id/:start/:end", function(req, res) {
  console.log("------",req.params.id, req.params.start, req.params.end);
  db.collection("BioHex").find({_p_user: '_User$'+req.params.id, timestamp3:{"$gte": new Date(req.params.start),"$lte": new Date(req.params.end)}}, {sensorData:true, timestamp3:true}).sort( { timestamp3: 1 } ).toArray(function(err, datas) {
    console.log('**',datas.length, '**', new Date(req.params.end));//_p_user: '_User$WG9qNBzaVZ'
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      var csv="Date,HeartRate,MaxHeartRate,AverageHeartRate,Speed,MaxSpeed,AverageSpeed,Cadence,MaxCadence,AverageCadence,Power,AveragePower,MaxPower,MovingTime,TotalMovingTime,getDistance,TotalDistance,GPSStatus,GPSLatitude,"+
    "GPSLongitude,GPSSpeed,GPSAltitude,GPSTimeUTC,GPSdateUTC,Elevation,TotalElevation,Ax,Ay,Az,Gx,Gy,Gz,Mx,My,Mz,Grade,Temperature,WindSPeed,MaxWindSpeed,AverageWindSpeed,WindDirection"+"\n";
    for (var i = 0; i<datas.length; i++) {
      var splitData = datas[i].sensorData.match(/.{1,16}/g);
        csv+=datas[i].timestamp3+',';
      for (var j = 0; j<splitData.length; j++) {
        //var test = Buffer(splitData[j], 'hex').readDoubleBE(0);
        csv+=Buffer(splitData[j], 'hex').readDoubleBE(0)+',';
      }
      csv+='\n';
      
    }
      //console.log(csv);
      res.attachment('bikeDatas.csv');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(csv, 'utf-8');
    }
  });
});


// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);

