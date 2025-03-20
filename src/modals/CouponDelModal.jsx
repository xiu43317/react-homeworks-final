/* eslint-disable react/prop-types */
function CuponDelModal({coupon}){
    return <>
      <div
    id="delCouponModal"
    // ref={delCouponModal}
    className="modal fade"
    tabIndex="-1"
    aria-labelledby="delProductModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content border-0">
        <div className="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" className="modal-title">
            <span>刪除優惠券</span>
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body text-start">
          是否刪除
          <strong className="text-danger">{ coupon.title }</strong>
          優惠券(刪除後將無法恢復)。
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline-secondary"
          >
            取消
          </button>
          <button type="button" className="btn btn-danger">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
    </>
}

export default CuponDelModal;