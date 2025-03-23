import propType from "prop-types"
import "../assets/css/carditem.css";
import { delFloat } from "../api/math";
import { useState,useEffect } from "react";
import { notify } from "../api/toast";

function CardItem({ cart, removable, isBtnDisabled, deleteItem, updateItem }) {
  const [qty, setQty] = useState(cart.qty);
  const { isRemovable } = removable
  let add = false
  const getTheQty = (e) => {
    console.log(e.target.value)
  };
  const updateCart = (qty) => {
    if (qty< 1) {
      notify(false, '數量不得小於1')
    } else {
      const renewData = {
        data: {
          product_id: cart.product.id,
          qty
        }
      }
      updateItem(cart, renewData, add)
    }
  }
  const addItem = () => {
    setQty(qty+1)
    add = true
    updateCart(qty+1)
  }
  const removeItem = () => {
    setQty(qty-1)
    add = false
    updateCart(qty-1)
  }
  useEffect(()=>{
    setQty(cart.qty)
  },[cart])
  return (
    <>
      <div className="row">
        <img
          className="img-fluid object-fit-cover col-4"
          style={{ height: "100px" }}
          src={cart.product.imageUrl}
          alt={cart.product.title}
        />
        <div className="col-8 d-flex justify-content-between align-items-center">
          <div className="d-flex flex-column justify-content-evenly">
            <span className="fw-bold">{cart.product.title}</span>
            {cart.total === cart.final_total ? (
              <>
                <span>小記：</span>
                <span>NT${cart.total}</span>
              </>
            ) : (
              <>
                <span className="text-success mt-1">折扣價：</span>
                <span className="text-success mt-1">NT${delFloat(cart.final_total)}</span>
              </>
            )}
          </div>
          <div className="d-flex align-items-center">
            {!isRemovable && <span className="fs-5">數量：</span>}
                <div className="input-group" style={{ maxWidth: "100px" }}>
                { isRemovable &&
                  <button
                    className="btn btn-sm btn-secondary border-0"
                    type="button"
                    disabled={isBtnDisabled || !isRemovable || qty === 1}
                    onClick={removeItem}
                  >
                    <i className="bi bi-dash-lg"></i>
                  </button>
                }
                  <input
                    disabled={isBtnDisabled || isRemovable}
                    type="number"
                    className="form-control text-center"
                    value={qty}
                    min="1"
                    onChange={(e) => getTheQty(e)}
                  />
                  { isRemovable &&
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary border-0"
                    disabled={isBtnDisabled || !isRemovable}
                    onClick={addItem}
                  >
                    <i className="bi bi-plus-lg"></i>
                  </button>
                  }
                </div>
                { isRemovable &&
                <a href="#" className="my-auto link-dark ms-1" onClick={(e)=>{
                    e.preventDefault()
                    deleteItem(cart)
                }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-trash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                  </svg>
                </a>
                }               
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}

CardItem.propTypes={
  cart:propType.object,
  removable: propType.object,
  isBtnDisabled: propType.bool,
  deleteItem: propType.func,
  updateItem: propType.func
}

export default CardItem;
