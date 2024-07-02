import foodModel from "../models/foodModel.js";
import fs from 'fs'

// add food item

const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })

    try {
        await food.save()
        res.json({success: true, message: 'Food item added successfully'})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: 'Failed to add food item'})
    }
}

// list of all food items
const listFood = async (req, res) => {
    try {
        const food = await foodModel.find({})
        res.json({success: true, data: food})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: 'Failed to fetch food items'})
    }
}

//remove food items

const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`, () => {})
        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success: true, message: 'Food item removed successfully'})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: 'Failed to remove food item'})
    }
}

const updateFood = async (req, res) => {
    try {
        const { id } = req.query;
        let updatedData = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category
        };

        if (req.file) {
            const food = await foodModel.findById(id);
            if (food.image) {
                fs.unlink(`uploads/${food.image}`, () => {});
            }
            updatedData.image = req.file.filename;
        }

        const food = await foodModel.findByIdAndUpdate(id, updatedData, { new: true });
        if (food) {
            res.json({ success: true, message: 'Item updated successfully', data: food });
        } else {
            res.json({ success: false, message: 'Item not found' });
        }
    } catch (error) {
        res.json({ success: false, message: 'Error updating item', error });
    }
}


export {addFood, listFood, removeFood, updateFood}
