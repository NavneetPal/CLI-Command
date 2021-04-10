#!/usr/bin/env node
const { program } = require('commander');
const {
    addCustomer,
    findCustomer,
    updateCustomer,
    removeCustomer,
    listCustomers
}=require('./index');
const inquirer=require('inquirer');

//Customer Questions
const questions=[
    {
        type:'input',
        name:'firstname',
        message:'Customer First Name'
    },
    {
        type:'input',
        name:'lastname',
        message:'Customer Last Name'
    },
    {
        type:'input',
        name:'phone',
        message:'Customer Phone Number'
    },
    {
        type:'input',
        name:'email',
        message:'Customer Email Address'
    }
]




program
    .version('1.0.0')
    .description('Client Management System')


/* program
    .command(`add <firstname> <lastname> <phone> <email>`)
    .alias('a')
    .description('Add a customer')
    .action((firstname,lastname,phone,email)=>{
        addCustomer({firstname,lastname,phone,email});
    }) */

//Add comand
program
    .command('add')
    .alias('a')
    .description('Add a customer')
    .action(()=>{
        inquirer.prompt(questions).then(answer=>addCustomer(answer))
    })

//Find Command
program
    .command(`find <name>`)
    .alias('f')
    .description('Find a customer')
    .action(name=>findCustomer(name))


//Update Command
program
    .command('update <_id>')
    .alias('u')
    .description('Update a customer')
    .action((_id)=>{
        inquirer.prompt(questions).then(answer=>updateCustomer(_id,answer))
    })

//Remove Command
program
    .command(`remove <_id>`)
    .alias('r')
    .description('Remove a customer')
    .action(_id=>removeCustomer(_id))


//List Command
program
    .command(`list`)
    .alias('l')
    .description('List all customer')
    .action(()=>listCustomers())



program.parse(process.argv)