const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const { mongoose } = require('./database');

// Settings
app.set('port', 3001);

//Middlewares
app.use(morgan('combined'));

// app.use(express.json());

app.get('/', (req, res) => {
    const message = 'Hola, mundo!';
    // Agrega la declaración debugger donde desees detener la ejecución.
    debugger;
    res.send(message);
  });


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(cors({ origin: '*' }));


//Proyecto Transportistas
app.use('/api/transiciones', require('./routes/transiciones.routes'))
app.use('/api/vehiculos', require('./routes/vehiculos.routes'))
app.use('/api/registros', require('./routes/registros.routes'))


//Starting the server
app.listen(app.get('port'), () => {
    console.log("Server on port " + app.get('port'));
    // console.log(process.memoryUsage());
});

module.exports=app
