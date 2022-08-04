import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import axios from "axios";
import Header from "./components/header";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import NewProduct from "./components/NewProduct";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [productList, setProductList] = useState([]);
  const [category, setCategory] = React.useState();

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpbXJhbmdhanNpbmdoYW5pMjU5QGdtYWlsLmNvbSIsImdpdGh1YiI6Imh0dHBzOi8vZ2l0aHViLmNvbS9zaW1yYW5nYWpzaW5naGFuaSIsImlhdCI6MTY1OTMzOTYwMCwiZXhwIjoxNjU5NzcxNjAwfQ.xuGbs8zXnWKDmi0jB1zZ5e9lhQsPciv52tyfwoLFryw";

  useEffect(() => {
    const fetchProducts = () => {
      axios
        .get("https://upayments-studycase-api.herokuapp.com/api/products", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setProducts(res.data.products);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const fetchProductsByCategory = () => {
      axios
        .get("https://upayments-studycase-api.herokuapp.com/api/categories/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setProductList(res.data.categories);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchProducts();
    fetchProductsByCategory();
  }, []);

  // Function to get filtered list
  function getFilteredList() {
    // Avoid filter when selectedCategory is null
    if (!category || category == "all") {
      return products;
    }
    return products.filter((item) => item.category === category);
  }

  // Avoid duplicate function calls with useMemo
  var filteredList = useMemo(getFilteredList, [category, products]);
  console.log(filteredList, "filterList");

  function handleCategoryChange(event) {
    setCategory(event.target.value);
  }

  return (
    <>
      <div className="py-2 bg-zinc-200 min-h-screen w-full">
        <Header />
        <div className="flex justify-center"></div>
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Products
                  loading={loading}
                  filteredList={filteredList}
                  handleCategoryChange={handleCategoryChange}
                  productList={productList}
                />
              }
            ></Route>
            <Route
              path="/product/:id"
              element={<ProductDetails products={products} />}
            ></Route>
            <Route path="/create_new_product" element={<NewProduct />}></Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
