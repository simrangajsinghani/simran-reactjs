import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@material-ui/core/Grid";
import "./Products.css";

function Products({
  products,
  loading,
  filteredList,
  handleCategoryChange,
  productList,
}) {
  return loading ? (
    <div className="flex justify-center">
      <CircularProgress />
    </div>
  ) : (
    <div className="gridStyles">
      <div className="buttonIcon">
        <Link to="/create_new_product">
          <button>
            <AddIcon />
          </button>
        </Link>
      </div>
      <div className="text-center">
        Select Category:
        <select onChange={handleCategoryChange}>
          <option value="all">All</option>
          {productList.map((item) => (
            <option value={item.name}>{item.name}</option>
          ))}
        </select>
      </div>
      <Grid container spacing={2}>
        {filteredList.map((item) => {
          return (
            <div className="flex flex-col space-x-7 my-5 p-6 justify-center items-center max-w-xs bg-white mx-auto shadow-xl rounded-xl cursor-pointer">
              <Grid item key={item._id} xs={12} sm={8}>
                <Link to={"/product/" + item._id}>
                  <img src={item.avatar} />
                  <h3>{item.name}</h3>
                </Link>
              </Grid>
            </div>
          );
        })}
      </Grid>
    </div>
  );
}

export default Products;
