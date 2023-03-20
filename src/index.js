const express = require('express');
const bodyParser = require('body-parser');
//const apicache = require('apicache');

//const v1Router = require("./v1/routes");

const v1WorkoutRouter = require('./v1/routes/workoutRoutes');
const { swaggerDocs: V1SwaggerDocs } = require('./v1/swagger');

const app = express();
//const cache = apicache.middleware;
const PORT = process.env.PORT || 4000;

//app.use("/api/v1", v1Router);

app.use(bodyParser.json()); // this is required to accept json
//app.use(cache("2 minutes")); // to cache all the routes
app.use('/api/v1/workouts', v1WorkoutRouter);

/* app.listen(PORT, () => {
  console.log(`API is working at the port ${PORT}`);
}); */

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
  /// *** ADD ***
  V1SwaggerDocs(app, PORT);
});
