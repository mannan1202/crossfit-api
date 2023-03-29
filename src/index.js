const express = require('express');
const bodyParser = require('body-parser');

const v1UserRouter = require('./v1/routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 4001;

app.use(bodyParser.json()); // this is required to accept json
app.use('/api/v1/users', v1UserRouter);

app.listen(PORT, () => {
  console.log(`API is working at the port ${PORT}`);
});
