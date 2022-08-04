import React, { useState } from "react";
import axios from "axios";

function NewProduct() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpbXJhbmdhanNpbmdoYW5pMjU5QGdtYWlsLmNvbSIsImdpdGh1YiI6Imh0dHBzOi8vZ2l0aHViLmNvbS9zaW1yYW5nYWpzaW5naGFuaSIsImlhdCI6MTY1OTMzOTYwMCwiZXhwIjoxNjU5NzcxNjAwfQ.xuGbs8zXnWKDmi0jB1zZ5e9lhQsPciv52tyfwoLFryw";
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    avatar: "",
    category: "",
    price: "",
    developerEmail: "simrangajsinghani259@gmail.com",
  });

  const handleChange = (event) => {
    setNewProduct({
      ...newProduct,
      [event.target.name]: event.target.value,
    });
  };

  const resetForm = () => {
    const resetData = {
      name: "",
      description: "",
      avatar: "",
      category: "",
      price: "",
      developerEmail: "simrangajsinghani259@gmail.com",
    };
    setNewProduct(resetData);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    try {
      // make axios post request
      axios({
        method: "post",
        url: "https://upayments-studycase-api.herokuapp.com/api/products",
        data: newProduct,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
    resetForm();
  };

  return (
    <form
      class="px-12 text-center rounded mx-auto max-w-2xl w-full my-32 inputs space-y-6"
      onSubmit={onSubmit}
    >
      <div>
        <h1 class="text-4xl font-bold">Create Product</h1>
      </div>

      <div>
        <input
          className="drop-shadow-2xl border-none from-slate-900 border-gray-400 px-4 py-3 rounded-xl w-full focus:outline-none focus:border-teal-400"
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <textarea
          className="drop-shadow-2xl h-32 border-none from-slate-900 border-gray-400 px-4 py-3 rounded-xl w-full focus:outline-none focus:border-teal-400"
          type="text"
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleChange}
        />
      </div>

      <div>
        <input
          className="drop-shadow-2xl border-none from-slate-900 border-gray-400 px-6 py-4 rounded-xl w-full focus:outline-none focus:border-teal-400"
          type="text"
          name="avatar"
          placeholder="Image Url"
          value={newProduct.avatar}
          onChange={handleChange}
        />
      </div>

      <div>
        <input
          className="drop-shadow-2xl border-none from-slate-900 border-gray-400 px-4 py-3 rounded-xl w-full focus:outline-none focus:border-teal-400"
          type="text"
          name="category"
          placeholder="Category"
          value={newProduct.category}
          onChange={handleChange}
        />
      </div>

      <div>
        <input
          className="drop-shadow-2xl border-none from-slate-900 border-gray-400 px-4 py-3 rounded-xl w-full focus:outline-none focus:border-teal-400"
          type="text"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleChange}
        />
      </div>

      <div>
        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default NewProduct;
