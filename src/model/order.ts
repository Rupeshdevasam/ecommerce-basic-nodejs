import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
    order_id: { type: String, unique: true, required: true },
    item_name: { type: String, required: true },
    cost: { type: String, required: true },
    order_date: {
        type: Date,
        required: true
    },
    delivery_date: {
        type: Date,
        min: new Date()
    }
});

export default mongoose.model("Order", orderSchema);