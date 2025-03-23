import propTypes from "prop-types"
import { NavLink } from "react-router-dom";

function NewsBigCard({ tempArticle }) {
  const path = `/onenews/${tempArticle.id}/num/${tempArticle.num}`;
  const foamatDate = new Date(tempArticle.create_at * 1000).toLocaleDateString('zh-TW')
  return (
    <>
      <div className="row mb-3 position-relative zoom-in">
        <div className="col-lg-4 rounded">
          <div className="frame rounded">
            <img
              className="img-fluid object-fit-cover rounded"
              src={tempArticle.imageUrl}
              alt={tempArticle.title}
            />
          </div>
        </div>
        <div className="col-lg-8 d-flex flex-column justify-content-center mt-2 mt-lg-0 ps-lg-5">
          <h3 className="mb-3">{tempArticle.title}</h3>
          <div>
            {tempArticle.tag?.map((item, index) => (
              <div key={index}>
                <span className="bg-warning py-1 px-3 me-1 rounded-3 fw-bold">
                  {item}
                </span>
                <span className="fs-8 ms-3">{foamatDate}</span>
              </div>
            ))}
          </div>
          <h4 className="mt-3">
            <NavLink
              to={path}
              className="text-decoration-none text-dark stretched-link"
            >
              {tempArticle.description}
            </NavLink>
          </h4>
        </div>
      </div>
      <hr />
    </>
  );
}

NewsBigCard.propTypes = {
  tempArticle: propTypes.object
}

export default NewsBigCard;
