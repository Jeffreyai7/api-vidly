import express from "express";
export const customersRouter = express.Router()
import { customerZodSchema, Customer } from "../models/customer.js";


customersRouter.get("/", async(req, res) => {
    const customers = await Customer.find().sort("name");
    res.send(customers);
})

customersRouter.post("/", async(req, res) => {
   const validation = customerZodSchema.safeParse(req.body)
    if(!validation.success)
        return res.status(400).json({errors: validation.error.errors})

    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone
    });

    await customer.save();

    res.send(customer); 
})

customersRouter.put("/:id", async(req, res) => {
    const validation = customerZodSchema.safeParse(req.body)
    if(!validation.success)
        return res.status(400).json({errors: validation.error.errors})

    const customer = await Customer.findByIdAndUpdate(req.params.id, {name:req.body.name, isGold: req.body.isGold, phone:req.body.phone}, {new:true})

    if(!customer)
        return res.status(404).send("Customer with the given status does not exist")
    
    res.send(customer);

})

customersRouter.delete("/:id", async(req, res) => {
    
    const customer = await Customer.findByIdAndDelete(req.params.id)
    
    if(!customer)
        return res.status(404).send("Customer with the given status does not exist")
    
    res.send(customer);
    
    })


customersRouter.get("/:id", async(req, res) => {
        
        const customer = await Customer.findById(req.params.id)
    
        if(!customer)
            return res.status(404).send("Customer with the given status does not exist")
        
        res.send(customer);

    })
