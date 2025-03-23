import propTypes from "prop-types"
import "../assets/css/classicdessert.css";
import { useNavigate } from "react-router-dom";
import "aos/dist/aos.css";

function ClassicDessert({ link, title, imgUrl ,fade}) {
  const navigate = useNavigate();
  return (
      <div
        className="col-12 col-lg-3 col-md-6 my-3 position-relative categlory rounded-pill"
        data-aos={fade} data-aos-duration="1000" data-aos-once="false"
        onClick={() => navigate(link)}
      >
        <img
          src={imgUrl}
          alt={title}
          className="img-fluid object-fit-cover w-100 rounded-pill"
        />
        <div className="position-absolute start-50 top-50 translate-middle text-center">
          <h4 className="fs-2 text-white bg">{title}</h4>
        </div>
      </div>
  );
}

ClassicDessert.propTypes={
  link: propTypes.string,
  title: propTypes.string,
  imgUrl: propTypes.string,
  fade: propTypes.string
}

export default ClassicDessert;
