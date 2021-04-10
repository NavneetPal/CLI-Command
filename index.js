const mongoose=require('mongoose');


//Connect to db
mongoose.connect('mongodb://localhost:27017/customcmdcli',{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useFindAndModify:true
})


//Import Model
const Customer=require('./models/customer');

//Add Customer 
const addCustomer=async(customer)=>{
    const newCustomer=await Customer.create(customer);
    if(newCustomer){
        console.info('New Customer addded');
    }
    mongoose.connection.close();
}

//Find Customer
const findCustomer=async(name)=>{
    //Make case insensitive
  const search=new RegExp(name,'i');
  const customer=await Customer.find({$or:[{firstname:search},{lastname:search}]});
  console.info(customer);
  console.info(`${customer.length} matches`)
  mongoose.connection.close();
}

//Update Customer
const updateCustomer=async(_id,customer)=>{
  const updatedCustomer=await Customer.updateOne({_id},customer,{new:true});
  if(updatedCustomer){
    console.info('Customer Updated');
  }
  mongoose.connection.close();
}

//Remove Customer
const removeCustomer=async(_id)=>{
    
 const customer=await Customer.deleteOne({_id});
 if(customer){
    console.info('Customer Removed');
 }
 mongoose.connection.close();
}

//Lidst all Customer
const listCustomers=async()=>{
    const customers=await Customer.find({});
    if(customers){
        console.info(customers);
        console.info(`${customers.length} customers`)
    }
    mongoose.connection.close();
}



module.exports={
    addCustomer,
    findCustomer,
    removeCustomer,
    updateCustomer,
    listCustomers
}