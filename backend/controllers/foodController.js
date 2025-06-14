import foodModel from "../models/foodModel.js";
import fs from 'fs'

// add food

const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })

    try {
        await food.save();
        res.json({ success: true, message: "Book Added" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

//All food list

const listFood = async (req, res) => {
    try {
        // Check if this is a newarrivals request
        const isNewArrivals = req.originalUrl.includes('newarrivals');
        
        // If it's newarrivals, sort by creation date in descending order
        const foods = await foodModel.find({})
            .sort(isNewArrivals ? { createdAt: -1 } : {})
            .limit(isNewArrivals ? 10 : 0); // Limit to 10 items for newarrivals
            
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// remove food item

const removeFood = async (req,res)=> {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Book Removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export { addFood, listFood, removeFood }