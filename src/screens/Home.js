import React from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Carousal from '../components/Carousal';
import { useEffect, useState } from 'react';

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState('');

  const loadFoodItems = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/auth/g_items", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      response = await response.json();
      setFoodItems(response[0]);
      setFoodCat(response[1]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    loadFoodItems();
  }, []);

  return (
    <div className='mainframe'  style={{ backgroundColor: '#182c31' }}>
      <Navbar />
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">

          <div className="carousel-inner " id='carousel'>
            <div class=" carousel-caption  " style={{ zIndex: "9" }}>
              <form className=" d-flex justify-content-center ">  {/* justify-content-center, copy this <form> from navbar for search box */}
              <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                <button className="btn text-white bg-success" type="submit">Search</button>
              </form>
            </div>
            <div className="carousel-item active" >
              <img src="https://www.bigbasket.com/media/uploads/banner_images/hp_m_health_suppliment_250723_400.jpg" className="d-block w-100  " style={{ filter: "brightness(40%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://www.bigbasket.com/media/uploads/banner_images/hp_m_petstore_250723_400.jpg" className="d-block w-100 " style={{ filter: "brightness(40%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://www.bigbasket.com/media/uploads/banner_images/hp_bcd_m_bcd_250723_400.jpg" className="d-block w-100 " style={{ filter: "brightness(40%)" }} alt="..." />
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

      <div className='container'>
        {foodCat.length !== 0
          ? foodCat.map((data) => (
            <div key={data._id}>
              <div className="fs3 m-3 gradient-text" >
                {data.CategoryName}
              </div>
              <hr />
              <div className="row">
                {foodItems.length !== 0
                  ? foodItems.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()))) 
                    .map(filteritems => (
                      <div key={filteritems._id} className="col-12 col-md-6 col-lg-3">
                        <Card
                          foodName={filteritems.name}
                          item={filteritems}
                          options={filteritems.options[0]}
                          ImgSrc={filteritems.img}
                        />
                      </div>
                    ))
                  : <div> no such data found </div>
                }
              </div>
            </div>
          ))
          : "'''''''''"
        }
      </div>
    </div>
  )
}
