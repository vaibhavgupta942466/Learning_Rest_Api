const express =  require('express'); // Import express
const joi = require('joi'); // Import joi
const app   = express(); // Create Express Application on the app variable
app.use(express.json()); // Use the JSON middleware

//Give data to the server
const customer = [
    {title:'George', id:1},
    {title:'John', id:2},
    {title:'Mary', id:3},
    {title:'Jane', id:4},
    {title:'Peter', id:5},
]

//Read Request Handler
//Display the messages when the url consist of '/'
app.get('/', (req, res) => {
    res.send('Hello World');
});
//Display the List of Customer when url Consist when url consist of api cunstomer
app.get('/api/customer', (req, res) => {
    res.send(customer); 
});
//Display Specific Customer when url consist of api/customer/1
app.get('/api/customer/:id', (req, res) => {
    const customer = customer.find(c => c.id === parseInt(req.params.id));
    if(!customer) res.status(404).send('Customer Not Found');
    res.send(customer);
});
//Create Request Handler
//Create a new customer
app.post('/api/customer', (req, res) => {
    const {error} = validateCustomer(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    const acustomer = {
        id: customer.length + 1,
        title: req.body.title
    };
    customer.push(acustomer);
    res.send(acustomer);
});

//Update Request Handler
//Update a customer
app.put('/api/customer/:id', (req, res) => {
    const customer = customer.find(c => c.id === parseInt(req.params.id));
    if(!customer) res.status(404).send('Customer Not Found');
    const {error} = validateCustomer(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    customer.title = req.body.title;
    res.send(customer);
});
//Delete Request Handler
//Delete a customer
app.delete('/api/customer/:id', (req, res) => {
    const customer = customer.find(c => c.id === parseInt(req.params.id));
    if(!customer) res.status(404).send('Customer Not Found');
    const index = customer.indexOf(customer);
    customer.splice(index, 1);
    res.send(customer);
});

//validate Information
function validateCustomer(acustomer){
    const schems = {
        title: Joi.string().min(3).required()
    };
    return Joi.validate(acustomer, schems);
}
//Port Enviroment Variable
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));