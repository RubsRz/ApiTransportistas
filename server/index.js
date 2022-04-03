const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const { mongoose } = require('./database');

// Settings
app.set('port', 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());


//Proyecto Transportistas
app.use('/api/transiciones', require('./routes/transiciones.routes'))
app.use('/api/vehiculos', require('./routes/vehiculos.routes'))
app.use('/api/registros', require('./routes/registros.routes'))


//Starting the server
app.listen(app.get('port'), () => {
    console.log("Server on port " + app.get('port'));
});