/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import "../assets/css/newcard.css"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

function NewCard({ oneNews }) {
    let path = `/onenews/${oneNews.id}/num/${oneNews.num}`;
    useEffect(()=>{
        AOS.init()
    },[])
  return (
    <>
      <div className="col-12 col-lg-4 col-md-6 my-3" data-aos="fade-up" data-aos-duration="1000" data-aos-once="false">
        <NavLink to={path}>
          <div className="card position-relative h-100 zoom-in">
            <div className="frame h-100">
              <img
                src={oneNews.imageUrl}
                alt={oneNews.title}
                className="img-fluid object-fit-cover opacity-25 h-100"
              />
              <div className="position-absolute start-50 top-50 translate-middle text-center">
                <h4 className="fs-2 fw-bold">{oneNews.title}</h4>
                <h5 className="fs-5 mt-3 fw-bold">{oneNews.description}</h5>
              </div>
            </div>
          </div>
        </NavLink>
      </div>
    </>
  );
}

export default NewCard;
