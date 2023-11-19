// ItemForm.tsx
import React from "react";

interface ItemFormProps {
  // Define your form input fields and their corresponding properties here
  // For example, item name, quantity, price, etc.
}

const ItemForm: React.FC<ItemFormProps> = (props) => {
  // Implement your form component here with input fields
  return (
    <div>
      {/* Your form input fields */}
      <input type="text" name="itemName" placeholder="Item Name" />
      <input type="number" name="quantity" placeholder="Quantity" />
      <input type="number" name="price" placeholder="Price" />
    </div>
  );
};

export default ItemForm;
