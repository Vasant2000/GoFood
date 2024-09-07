import React, { Component ,useState} from 'react'

function Carousel(props)  {
  const [Csearch, setCSearch] = useState('')
  
    
   return (
    <div id="carouselExampleFade" className ="carousel slide carousel-fade " data-bs-ride="carousel" style={{objectfit : "contain !important"}} >
    <div className="carousel-inner" id="carousel" >
    <div className="carousel-caption " style={{zIndex:'10'}}>
    <div className="d-flex">
      <input className="form-control me-2" type="search" value={global.CarouselSearch} onChange={(e)=> {setCSearch(e.target.value)}} placeholder="Search" aria-label="Search"/>
      
    </div>
      </div>
      <div className="carousel-item active">
        <img src="https://media.istockphoto.com/id/606042756/video/taking-a-slice-of-pizza-from-the-plate.jpg?s=640x640&k=20&c=88NSenNhozZqtJGJMOzDjzutudDDydN3Icw2JaF1SbY=" className="d-block w-100" alt="..." objectfit="contain"/>
      </div>
      <div className="carousel-item">
        <img src="https://media.istockphoto.com/id/857947444/video/zoom-out-of-chef-decorating-his-plate-and-looking-very-happy.jpg?s=640x640&k=20&c=pNf8nv5cWwZc-dYadLD4kxy9fbk4MmCvseDZuHTdZY8=" className="d-block w-100" alt="..."/>
      </div>
      <div className="carousel-item">
        <img src="https://media.istockphoto.com/id/1316145932/photo/table-top-view-of-spicy-food.jpg?s=612x612&w=is&k=20&c=w0E-weCFT6Xy_vRI9o2aAJT3a6_JdsdMfQYoMudFZfg=" className="d-block w-100" alt="..."/>
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
    )}

 
export default Carousel;