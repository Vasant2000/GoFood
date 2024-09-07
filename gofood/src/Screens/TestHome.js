import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";
import Sidebar from "../Components/Sidebar";
import axios from "axios";
import { useCart } from "../Components/ContextReducer";
import Modal from "../Modal";
import TestCart from "../Screens/TestCart";

import '../Components/Home.css';
import '../Components/FilterButtons.css';
import '../Components/Navbar.css'

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [CSearch, setCSearch] = useState('');
  const [seasonFilter, setSeasonFilter] = useState('All'); // Default to All
  const [isVegOnly, setIsVegOnly] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Add state for modal
  const [previousSeasonFilter, setPreviousSeasonFilter] = useState('All'); // Track previous season
  const cart = useCart();

  // Weather API call (left untouched as requested)
  const fetchWeather = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Gwalior&units=metric&appid=0b1c8f604ea529582f0cb227af0fc3e9`);
      const weatherData = response.data;

      const temp = weatherData.main.temp;
      const isRaining = weatherData.weather.some(condition => condition.main.toLowerCase().includes('rain'));

      if (isRaining) {
        setSeasonFilter('Monsoon');
      } else if (temp > 32) {
        setSeasonFilter('Summer');
      } else if (temp < 15) {
        setSeasonFilter('Winter');
      } else {
        setSeasonFilter('All');
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // Check the current month and set the season filter based on date
  const setSeasonByDate = () => {
    const currentMonth = new Date().getMonth(); // Get the current month (0-11)

    if (currentMonth >= 5 && currentMonth <= 8) {
      // June to September (Months 5 to 8)
      setSeasonFilter('Monsoon');
    } else if (currentMonth >= 9 || currentMonth <= 0) {
      // October to January (Months 9 to 11 and Month 0)
      setSeasonFilter('Winter');
    } else if (currentMonth >= 1 && currentMonth <= 4) {
      // February to May (Months 1 to 4)
      setSeasonFilter('Summer');
    }
  };

  const loadData = async () => {
    try {
      let response = await axios.post("http://localhost:5000/api/foodData", {});
      let [category, items] = response.data;
      setFoodItem(items);
      setFoodCat(category);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    //setSeasonByDate(); // Set season by date when the component loads
    fetchWeather(); // Fetch weather data after setting the season based on date
    loadData(); // Load the food items and categories
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
  }, [cart]);

  const handleShowAllToggle = () => {
    if (seasonFilter === 'All') {
      setSeasonFilter(previousSeasonFilter); // Revert to previous season
    } else {
      setPreviousSeasonFilter(seasonFilter); // Save current season
      setSeasonFilter('All'); // Set to All
    }
  };

  const filteredItems = foodItem.filter(item => {
    const isSeasonMatch = seasonFilter === 'All' || item.season.toLowerCase() === seasonFilter.toLowerCase();
    const isSearchMatch = item.name.toLowerCase().includes(CSearch.toLowerCase());
    const isVegMatch = !isVegOnly || item.Veg === true;
    return isSeasonMatch && isSearchMatch && isVegMatch;
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="home-container">
      <Navbar openCartModal={openModal} /> {/* Pass function to Navbar */}
      
      {/* Carousel and Search Bar */}
      <div className="carousel-section">
        <div className="carousel-container">
          <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <video className="d-block w-100" autoPlay muted loop>
                  <source src="https://videos.pexels.com/video-files/3196344/3196344-sd_640_360_25fps.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="carousel-item">
                <video className="d-block w-100" autoPlay muted loop>
                  <source src="https://videos.pexels.com/video-files/2620043/2620043-sd_640_360_25fps.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="carousel-item">
                <video className="d-block w-100" autoPlay muted loop>
                  <source src="https://videos.pexels.com/video-files/3195369/3195369-sd_640_360_25fps.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
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

      {/* Season Message */}
      <div className="season-message text-center my-3">
        {seasonFilter === 'Summer' && <h3>It's Summer. Here are our specialties.</h3>}
        {seasonFilter === 'Winter' && <h3>It's Winter. Here are our specialties.</h3>}
        {seasonFilter === 'Monsoon' && <h3>It's Monsoon. Here are our specialties.</h3>}
      </div>

      {/* Filter Buttons */}
      <div className="filter-buttons text-center my-3">
        <button onClick={handleShowAllToggle} className={seasonFilter === 'All' ? 'active' : ''}>Show All</button>
        <button onClick={() => setIsVegOnly(!isVegOnly)} className={isVegOnly ? 'active' : ''}>{isVegOnly ? 'Show All' : 'Veg Only'}</button>
      </div>

      {/* Sidebar Container */}
      <div className={`sidebar-container ${isSidebarOpen ? 'open' : ''}`}>
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} openCartModal={openModal} />
      </div>

      {/* Content Container */}
      <div className="content-container">
        <div className="container me-3">
          {foodCat.length > 0 ? (
            foodCat.map((data) => (
              <div className="row mb-3 me-1" key={data._id}>
                <div className="fs-3 m-3 text-light">
                  {data.categoryName}
                </div>
                <hr className="bg-light" />
                {filteredItems.length > 0 ? (
                  filteredItems
                    .filter(
                      (item) =>
                        item.CategoryName === data.categoryName
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

      {/* Modal */}
      {isModalOpen && <Modal onClose={closeModal}><TestCart /></Modal>}

      <Footer />
    </div>
  );
}
