import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";
import Sidebar from "../Components/Sidebar";
import axios from "axios";
import { useCart } from "../Components/ContextReducer";
import '../Components/Home.css';

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [foodSeason, setFoodSeason] = useState([]);
  const [CSearch, setCSearch] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const cart = useCart(); // Access cart items

  const loadData = async () => {
    try {
      let response = await axios.post("http://localhost:5000/api/foodData", {});
      let [category, items ,season] = response.data;
      setFoodItem(items);
      setFoodCat(category);
      setFoodSeason(season)
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    // Open sidebar if cart has items, close if empty
    if (cart.length > 0) {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
  }, [cart]);

  return (
    <div className="home-container">
  <Navbar />
  
  {/* Carousel and Search Bar */}
  <div className="carousel-section">
    <div className="carousel-container">
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://media.istockphoto.com/id/606042756/video/taking-a-slice-of-pizza-from-the-plate.jpg?s=640x640&k=20&c=88NSenNhozZqtJGJMOzDjzutudDDydN3Icw2JaF1SbY=" className="d-block w-100" alt="Pizza" />
          </div>
          <div className="carousel-item">
            <img src="https://media.istockphoto.com/id/857947444/video/zoom-out-of-chef-decorating-his-plate-and-looking-very-happy.jpg?s=640x640&k=20&c=pNf8nv5cWwZc-dYadLD4kxy9fbk4MmCvseDZuHTdZY8=" className="d-block w-100" alt="Chef" />
          </div>
          <div className="carousel-item">
            <img src="https://media.istockphoto.com/id/1316145932/photo/table-top-view-of-spicy-food.jpg?s=612x612&w=is&k=20&c=w0E-weCFT6Xy_vRI9o2aAJT3a6_JdsdMfQYoMudFZfg=" className="d-block w-100" alt="Spicy Food" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    <div className="search-bar-container">
      <input
        className="form-control search-input"
        type="search"
        value={CSearch}
        onChange={(e) => setCSearch(e.target.value)}
        placeholder="Search"
        aria-label="Search"
      />
    </div>
  </div>

  {/* Sidebar Container */}
  <div className={`sidebar-container ${isSidebarOpen ? 'open' : ''}`}>
    <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
  </div>

  {/* Content Container */}
  <div className="content-container">
    <div className="container mt-3">
      {foodSeason.length > 0 ? (
        foodSeason.map((data) => (
          <div className="row mb-3" key={data._id}>
            <div className="fs-3 m-3 text-light">
              {data.season}
            </div>
            <hr className="bg-light" />
            {foodItem.length > 0 ? (
              foodItem
                .filter(
                  (item) =>
                    item.season === data.season.toLowerCase() &&
                    item.name.toLowerCase().includes(CSearch.toLowerCase())
                )
                .map((filterItems) => (
                  <div
                    key={filterItems._id}
                    className="col-12 col-md-6 col-lg-3 mb-3"
                    style={{ width: "300px" }}
                  >
                    <Card
                      foodItem={filterItems}
                      options={filterItems.options[0]}
                      src={filterItems.img}
                    />
                  </div>
                ))
            ) : (
              <div className="text-light">No items available</div>
            )}
          </div>
        ))
      ) : (
        <div className="text-light">No categories available</div>
      )}
    </div>
  </div>

  <Footer />
</div>
  );
}
