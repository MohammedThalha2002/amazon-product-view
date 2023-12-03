import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Home() {
  const { id } = useParams();
  // states
  const [details, setDetails] = useState({
    _id: "656b0cbfa7c6f6544a757933",
    url: "",
    title: "",
    features: [],
    imgUrl: "",
    inStock: true,
    rating: 3.1,
    exp_price: 0,
    curr_price: 0,
    email: "mohammedthalha2209@gmail.com",
    __v: 0,
  });

  useEffect(() => {
    if (id != null) {
      fetchData();
    } else {
      console.log("Id is empty");
    }
  }, []);

  const fetchData = async () => {
    await axios
      .get(import.meta.env.VITE_BACKEND_URL + "/track-detail-by-id/" + id)
      .then((res) => {
        console.log(res.data);
        setDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container">
      <div className="card">
        <div className="content-picture">
          <div className="photo">
            <img src={details.imgUrl} />
          </div>
        </div>
        <div className="logo" />
        <div className="content-text">
          <div className="header">
            <h1>{details.title}</h1>
          </div>
          <h4>{details.inStock ? "IN STOCK" : "OUT OF STOCK"}</h4>
          <h5>Current Price : ₹{details.curr_price}</h5>
          <h5 className="black-h5">Expected Price : ₹{details.exp_price}</h5>
          <div className="rating-div">
            <StarRating rating={details.rating} />
            <span>3.7</span>
          </div>
          <h3>DESCRIPTION</h3>
          {details.features.map((data, i) => (
            <p key={i}>{data}</p>
          ))}
          <div className="call_to">
            <a href={details.url} target="_blank">
              <i className="fa fa-share-alt" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const StarRating = ({ rating }) => {
  // Calculate the number of full stars, half stars, and empty stars
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  // Generate the stars based on the calculations
  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<i key={i} className="fa fa-star" />);
  }
  if (hasHalfStar) {
    stars.push(<i key="half" className="fa fa-star-half-o" />);
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<i key={`empty-${i}`} className="fa fa-star-o" />);
  }

  return <div className="rating">{stars}</div>;
};

export default Home;
