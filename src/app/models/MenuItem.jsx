import mongoose, { model, models, Schema } from "mongoose";

const ExtraPriceSchema = new Schema({
  name: { type: String },
  price: { type: Number },
});

const MenuItemsSchema = new Schema(
  {
    image: { type: String },
    name: { type: String, required: true },
    description: { type: String },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Assuming a Category model exists
      required: true,
    },
    basePrice: { type: Number, required: true },
    sizes: { type: [ExtraPriceSchema] },
    extraIngredientPrices: { type: [ExtraPriceSchema] },
  },
  { timestamps: true }
);

// Export the model
export const MenuItem =
  models?.MenuItems || model("MenuItems", MenuItemsSchema);
