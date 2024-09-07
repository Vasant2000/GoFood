import React, { Component, useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";

import axios from "axios";

export default function Home() {
  const [foodCat, setfoodCat] = useState([]);
  const [foodItem, setfoodItem] = useState([]);
  const [CSearch, setCSearch] = useState('');
  //console.log(CSearch)

  const loadData = async () => {
    let response = await axios.post("http://localhost:5000/api/foodData", {}); //.then((result)=> {const response= result.response.json; console.log(response[0],response[1])})

    //console.log(response.data[0], response.data[1]);
    let Item = response.data[1];
    let Category = response.data[0];
 
    setfoodItem(Item);
    setfoodCat(Category);
    console.log(window)  
  };

  useEffect(() => {
    loadData();
  }, []);
 
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade "
          data-bs-ride="carousel"
          style={{ objectfit: "contain !important" }}>
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption " style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  value={CSearch}
                  onChange={(e) => {
                    setCSearch(e.target.value);
                  }}
                  placeholder="Search"
                  aria-label="Search"
                />
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://media.istockphoto.com/id/606042756/video/taking-a-slice-of-pizza-from-the-plate.jpg?s=640x640&k=20&c=88NSenNhozZqtJGJMOzDjzutudDDydN3Icw2JaF1SbY="
                className="d-block w-100"
                alt="..."
                objectfit="contain"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://media.istockphoto.com/id/857947444/video/zoom-out-of-chef-decorating-his-plate-and-looking-very-happy.jpg?s=640x640&k=20&c=pNf8nv5cWwZc-dYadLD4kxy9fbk4MmCvseDZuHTdZY8="
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://media.istockphoto.com/id/1316145932/photo/table-top-view-of-spicy-food.jpg?s=612x612&w=is&k=20&c=w0E-weCFT6Xy_vRI9o2aAJT3a6_JdsdMfQYoMudFZfg="
                className="d-block w-100"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="m-3 bg-rounded container">
      
        {foodCat.length > 0 ? (
          foodCat.map((data) => {
            return (
              
              <div className="row mb-3">
                <div key={data._id} className="fs-3 m-3">
                  {data.categoryName}
                </div>
                <hr />
                {foodItem.length > 0 ? (
                  foodItem
                    .filter(
                      (item) =>
                        (item.CategoryName === data.categoryName )&&
                        (item.name.toLowerCase().includes(CSearch.toLocaleLowerCase()))
                    )
                    .map((filterItems) => {
                      return (
                        <div
                          key={filterItems._id}
                          className="col-12 col-md-6 col-lg-3 border m-2 "
                          style={{width:"300px",objectFit:"fill"}}
                        >
                          <Card
                          foodItem = {filterItems}
                            //foodname={filterItems.name}
                            options={filterItems.options[0]}
                            src={filterItems.img}
                          ></Card>
                        </div>
                      );
                    })
                ) : (
                  <div>no such data</div>
                )}
              </div>
            );
          })
        ) : (
          <div>No such Data</div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}