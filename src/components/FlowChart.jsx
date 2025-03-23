import PropTypes from "prop-types";

function FlowChart({ progress }) {
  return (
    <>
      <div className="container mt-5 px-5">
        <div
          className="position-relative my-4 mx-auto"
          style={{ height: "30px", maxWidth: "900px", width: "90%" }}
        >
          <div className="progress" style={{ height: "1px" }}>
            <div
              className="progress-bar bg-secondary"
              role="progressbar"
              style={{ width: `${progress}%` }}
              aria-valuenow="50"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <div
            className="position-absolute top-0 start-0 translate-middle btn btn-sm btn-secondary rounded-pill border"
            style={{ width: "2rem", height: "2rem" }}
          >
            1
          </div>
          <p className="position-absolute top-100 start-0 translate-middle">
            填寫資料
          </p>
          <div
            className={`position-absolute top-0 start-50 translate-middle btn btn-sm rounded-pill border ${
              progress >= 50 ? "btn-secondary" : "btn-light"
            }`}
            style={{ width: "2rem", height: "2rem" }}
          >
            2
          </div>
          <p className="position-absolute top-100 start-50 translate-middle">
            付款資訊
          </p>
          <div
            className={`position-absolute top-0 start-100 translate-middle btn btn-sm rounded-pill border ${
              progress >= 100 ? "btn-secondary" : "btn-light"
            }`}
            style={{ width: "2rem", height: "2rem" }}
          >
            3
          </div>
          <p className="position-absolute top-100 start-100 translate-middle text-nowrap">
            完成訂單
          </p>
        </div>
      </div>
    </>
  );
}

FlowChart.propTypes={
  progress: PropTypes.number
}

export default FlowChart;
