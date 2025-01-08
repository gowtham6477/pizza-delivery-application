import EditableImage from "@/components/EditableImage";
import { useEffect, useState } from "react";
import MenuItemPriceProps from "./MenuItemPriceProps";

export default function MenuItemForm({ onSubmit, menuItem }) {
  // State declarations
  const [formData, setFormData] = useState({
    image: menuItem?.image || "",
    name: menuItem?.name || "",
    description: menuItem?.description || "",
    basePrice: menuItem?.basePrice || "",
    sizes: menuItem?.sizes || [],
    extraIngredientPrices: menuItem?.extraIngredientPrices || [],
    category: menuItem?.category || "",
  });

  const [categories, setCategories] = useState([]);

  // Update form data from menuItem if changed
  useEffect(() => {
    if (menuItem) {
      setFormData({
        image: menuItem.image || "",
        name: menuItem.name || "",
        description: menuItem.description || "",
        basePrice: menuItem.basePrice || "",
        sizes: menuItem.sizes || [],
        extraIngredientPrices: menuItem.extraIngredientPrices || [],
        category: menuItem.category || "",
      });
    }
  }, [menuItem]);

  // Fetch categories
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    onSubmit(ev, formData);
  };

  return (
    <form className="mt-8 max-w-2xl mx-auto" onSubmit={handleSubmit}>
      <div
        className="grid items-start gap-4"
        style={{ gridTemplateColumns: ".3fr .7fr" }}
      >
        <div>
          <EditableImage
            link={formData.image}
            setLink={(link) =>
              setFormData((prevData) => ({ ...prevData, image: link }))
            }
          />
        </div>

        <div className="grow">
          <label>Item name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <label>Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories?.length > 0 &&
              categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>

          <label>Base Price</label>
          <input
            type="text"
            name="basePrice"
            value={formData.basePrice}
            onChange={handleChange}
          />

          <MenuItemPriceProps
            name={"Sizes"}
            addLabel={"Add item size"}
            props={formData.sizes}
            setProps={(sizes) =>
              setFormData((prevData) => ({ ...prevData, sizes }))
            }
          />

          <MenuItemPriceProps
            name={"Extra ingredients"}
            addLabel={"Add ingredients"}
            props={formData.extraIngredientPrices}
            setProps={(extraIngredientPrices) =>
              setFormData((prevData) => ({ ...prevData, extraIngredientPrices }))
            }
          />

          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}
