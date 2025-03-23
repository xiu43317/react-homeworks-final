import propTypes from "prop-types"

function ButtomPagination({pageInfo,handlePageChange,category}) {
    return (
      <div className="d-flex justify-content-center">
        <nav>
          <ul className="pagination">
            <li className={`page-item ${!pageInfo.has_pre && "disabled"}`}>
              <a
                onClick={(e) => handlePageChange(e,pageInfo.current_page - 1,category)}
                className="page-link"
                href="#"
              >
                上一頁
              </a>
            </li>
            {Array.from({ length: pageInfo.total_pages }).map((_, index) => (
              <li
                key={index}
                className={`page-item ${
                  pageInfo.current_page === index + 1 && "active"
                }`}
              >
                <a
                  onClick={(e) => handlePageChange(e,index + 1,category)}
                  className="page-link"
                  style={pageInfo.current_page === index + 1?{pointerEvents:"none"}:null}
                  href="#"
                >
                  {index + 1}
                </a>
              </li>
            ))}
  
            <li className={`page-item ${!pageInfo.has_next && "disabled"}`}>
              <a
                onClick={(e) => handlePageChange(e,pageInfo.current_page + 1,category)}
                className="page-link"
                href="#"
              >
                下一頁
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
  
ButtomPagination.propTypes={
  pageInfo: propTypes.object,
  handlePageChange: propTypes.func,
  category: propTypes.string
}

  export default ButtomPagination;
  