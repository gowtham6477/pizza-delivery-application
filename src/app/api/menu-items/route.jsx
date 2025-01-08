import { MenuItem } from "@/app/models/MenuItem";
import mongoose from "mongoose";

// Connect to the database
async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URL);
  }
}

// Create a new menu item
export async function POST(req) {
  await connectDB(); // Ensure DB connection

  try {
    const data = await req.json();

    // Log received data
    console.log("Received Data:", data);

    // Validate ObjectId for the category field
    if (!mongoose.Types.ObjectId.isValid(data.category)) {
      console.error("Invalid category ID");
      return Response.json({ error: "Invalid category ID" }, { status: 400 });
    }

    const menuItemDoc = await MenuItem.create(data);

    return Response.json(menuItemDoc); // Send response with created data
  } catch (err) {
    console.error("Error saving menu item:", err.message); // Log the error
    return Response.json({ error: err.message }, { status: 500 }); // Return error response
  }
}

// Update an existing menu item
export async function PUT(req) {
  await connectDB(); // Ensure DB connection

  try {
    const { _id, ...data } = await req.json();

    // Validate ObjectId for the category field
    if (data.category && !mongoose.Types.ObjectId.isValid(data.category)) {
      throw new Error("Invalid category ID");
    }

    const updatedItem = await MenuItem.findByIdAndUpdate(_id, data, {
      new: true,
    });

    return Response.json(updatedItem);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 400 });
  }
}

// Fetch all menu items
export async function GET(req) {
  await connectDB(); // Ensure DB connection

  try {
    const menuItems = await MenuItem.find().populate("category"); // Populate category field if needed
    return Response.json(menuItems);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 400 });
  }
}

// Delete a menu item
export async function DELETE(req) {
  await connectDB(); // Ensure DB connection

  try {
    const url = new URL(req.url);
    const _id = url.searchParams.get("_id");

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new Error("Invalid menu item ID");
    }

    await MenuItem.deleteOne({ _id });
    return Response.json(true);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 400 });
  }
}
