import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProductDetails({ products }) {
  const [details, setDetails] = useState([]);
  let { id } = useParams();
  const { image, price, title } = products;
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpbXJhbmdhanNpbmdoYW5pMjU5QGdtYWlsLmNvbSIsImdpdGh1YiI6Imh0dHBzOi8vZ2l0aHViLmNvbS9zaW1yYW5nYWpzaW5naGFuaSIsImlhdCI6MTY1OTMzOTYwMCwiZXhwIjoxNjU5NzcxNjAwfQ.xuGbs8zXnWKDmi0jB1zZ5e9lhQsPciv52tyfwoLFryw";
  // const [id] = useState();

  //   const product = products.find((x) => x.id === id);
  //   console.log(product, "product");

  // useEffect(() => {
  //   const getDetails = products.map((item) => {
  //     if (item.id == id) {
  //       return setDetails(item);
  //       console.log(details, "details");
  //     }
  //   });
  // }, [id]);

  useEffect(() => {
    const fetchProductId = () => {
      axios
        .get(
          `https://upayments-studycase-api.herokuapp.com/api/products/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          // console.log(res.data.product, "fetchprodId");
          setDetails(res.data.product);
          // console.log(res.data.product._id, "item Id");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchProductId();
    // console.log(details._id, "_id");
  }, [id]);

  return (
    <>
      <div className="flex p-5 m-4">
        <div>
          <img
            src={details.avatar}
            alt={title}
            className="object-contain w-full max-h-56"
          />
        </div>
        <div className="pt-1 pl-10">
          <h3 className="text-lg font-bold">Brand:{details.name}</h3>
          <h3>{details.price}</h3>
        </div>
      </div>
      <div className="pt-1 pl-10">
        <h3>
          Description
          <br />
          {details.description}
        </h3>
      </div>
    </>
  );
}

export default ProductDetails;
