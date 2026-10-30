import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';

const PostReview = () => {
  const [dealer, setDealer] = useState({});
  const [review, setReview] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [date, setDate] = useState("");
  const [carmodels, setCarmodels] = useState([]);

  let curr_url = window.location.href;
  let root_url = curr_url.substring(0, curr_url.indexOf("postreview"));
  let params = useParams();
  let id = params.id;
  let dealer_url = root_url + `djangoapp/dealer/${id}`;
  let review_url = root_url + `djangoapp/add_review`;
  let carmodels_url = root_url + `djangoapp/get_cars`;

  const postreview = async () => {
    let firstName = sessionStorage.getItem("firstname");
    let lastName = sessionStorage.getItem("lastname");
    let username = sessionStorage.getItem("username");
    
    let name = (firstName && lastName && firstName !== "null" && lastName !== "null") 
      ? `${firstName} ${lastName}` 
      : (username || "Anonymous");

    if (!model || review.trim() === "" || !date || !year) {
      alert("All details are mandatory");
      return;
    }

    let model_split = model.split(" ");
    let make_chosen = model_split[0];
    let model_chosen = model_split.slice(1).join(" "); // handles multi-word model names safely

    let jsoninput = JSON.stringify({
      "name": name,
      "dealership": Number(id),
      "review": review,
      "purchase": true,
      "purchase_date": date,
      "car_make": make_chosen,
      "car_model": model_chosen,
      "car_year": Number(year),
    });

    console.log(jsoninput);
    
    try {
      const res = await fetch(review_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: jsoninput,
      });

      const json = await res.json();
      if (json.status === 200) {
          window.location.href = window.location.origin + "/dealer/" + id;
      } else {
          alert("Failed to post review: " + (json.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error posting review:", error);
      alert("Network error while posting review.");
    }
  }

  const get_dealer = async () => {
    try {
      const res = await fetch(dealer_url, { method: "GET" });
      const retobj = await res.json();
      
      if (retobj.status === 200 && retobj.dealer) {
        let dealerobjs = Array.isArray(retobj.dealer) ? retobj.dealer : [retobj.dealer];
        if (dealerobjs.length > 0) setDealer(dealerobjs[0]);
      }
    } catch (error) {
      console.error("Error fetching dealer:", error);
    }
  }

  const get_cars = async () => {
    try {
      const res = await fetch(carmodels_url, { method: "GET" });
      const retobj = await res.json();
      
      if (retobj && retobj.CarModels) {
        setCarmodels(Array.isArray(retobj.CarModels) ? retobj.CarModels : []);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  }

  useEffect(() => {
    get_dealer();
    get_cars();
  }, []);

  return (
    <div>
      <Header/>
      <div style={{ margin: "5%" }}>
        <h1 style={{ color: "darkblue" }}>{dealer?.full_name || dealer?.name || "Dealership"}</h1>
        <textarea id='review' cols='50' rows='7' onChange={(e) => setReview(e.target.value)}></textarea>
        
        <div className='input_field'>
          Purchase Date <input type="date" onChange={(e) => setDate(e.target.value)}/>
        </div>
        
        <div className='input_field'>
          Car Make 
          <select name="cars" id="cars" defaultValue="" onChange={(e) => setModel(e.target.value)}>
            <option value="" disabled>Choose Car Make and Model</option>
            {Array.isArray(carmodels) && carmodels.map((carmodel, index) => (
              <option key={index} value={`${carmodel.CarMake} ${carmodel.CarModel}`}>
                {carmodel.CarMake} {carmodel.CarModel}
              </option>
            ))}
          </select>        
        </div>

        <div className='input_field'>
          Car Year <input type="number" onChange={(e) => setYear(e.target.value)} max={2026} min={2015}/>
        </div>

        <div>
          <button className='postreview' onClick={postreview}>Post Review</button>
        </div>
      </div>
    </div>
  )
}

export default PostReview;