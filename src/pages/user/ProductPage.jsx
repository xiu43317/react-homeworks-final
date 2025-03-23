import { useParams } from "react-router-dom";
import api from "../../api/axios";
import ReactLoading from "react-loading";
import { useEffect, useState } from "react";
import { notify } from "../../api/toast";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import ProductCard from "../../components/ProductCard";
import { useDispatch,useSelector } from "react-redux";
import { setCart,setIsCartLoading } from "../../redux/cartSlice";


function ProductPage() {
  const params = useParams();
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isCartLoading = useSelector((state)=>state.cart.isCartLoading)
  const cart = useSelector((state)=>state.cart.carts)
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [tempProduct, setTempProduct] = useState({});
  const [qtySelect, setQtySelect] = useState(1);
  const [dataReady, setDataReady] = useState(false);
  const getProduct = () => {
    setIsScreenLoading(true);
    api
      .getProduct(params.id)
      .then((res) => {
        setTempProduct({ ...res.data.product });
      })
      .catch((err) => {
        notify(false, err.response.data.message);
        setIsScreenLoading(false);
      });
  };
  const getProducts = () => {
    api
      .getProducts(1, tempProduct.category)
      .then((res) => {
        setProducts([...res.data.products]);
        setIsScreenLoading(false);
        setDataReady(true);
      })
      .catch((err) => {
        notify(err.response.data.message);
        setIsScreenLoading(false);
      });
  };

  const getCart = () => {
    api
      .getCart()
      .then((res) => {
        dispatch(setCart({ cart: { ...res.data.data } }));
      })
      .catch((err) => {
        notify(false, err.response.data.message);
      });
    notify(true, "已更新購物車");
    setIsLoading(false)
    dispatch(setIsCartLoading({isLoading:false}))
  };
  const addToCart = async () => {
    const title = tempProduct.title
    setIsLoading(true)
    dispatch(setIsCartLoading({isLoading:true}))
    const index = cart.carts.findIndex(item => item.product_id === tempProduct.id)
    const item = {
      data: {
        product_id: tempProduct.id,
        qty: Number(qtySelect)
      }
    }
    // 有在購物車裡面
    if (index !== -1) {
      const newQty = cart.carts[index].qty + Number(qtySelect)
      const cartId = cart.carts[index].id
      item.data.qty = newQty
      await api.updateCart(cartId, item)
        .then((res) => {
          notify(true, `${title}${res.data.message}`)
        })
        .catch((err) => {
          notify(false, err.response.data.message)
        })
      getCart()
    } else {
      // 沒有在購物車裡面
      await api.createCart(item)
        .then((res) => {
          notify(true, `${title}${res.data.message}`)
        })
        .catch((err) => {
          notify(false, err.response.data.message)
        })
      getCart()
    }
  }
  useEffect(() => {
    getProduct();
  }, [params]);
  useEffect(() => {
    getProducts();
  }, [tempProduct]);
  return (
    <>
      {isScreenLoading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(255,255,255,0.3)",
            zIndex: 999,
          }}
        >
          <ReactLoading type="spin" color="black" width="4rem" height="4rem" />
        </div>
      )}
      <div className="container">
        <nav
          style={{ bsBreadcrumbDivider: ">" }}
          aria-label="breadcrumb"
          className="mt-3"
        >
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a
                className="link-secondary fs-5 text-decoration-none"
                href="#/products"
              >
                產品列表
              </a>
            </li>
            <li
              className="breadcrumb-item text-success fw-bold fs-5"
              aria-current="page"
            >
              產品資訊
            </li>
          </ol>
        </nav>
        {tempProduct && (
          <>
            <div className="row">
              <div className="col-md-6">
                <img
                  className="img-fluid object-fit-cover w-100 mb-2"
                  src={tempProduct.imageUrl}
                  alt={tempProduct.title}
                  style={{ maxHeight: "400px" }}
                  data-aos="zoom-in" data-aos-duration="2000"
                />
              </div>
              <div className="col-md-6 d-flex flex-column">
                <h4 className="fs-1 fw-bold mb-3">{tempProduct.title}</h4>
                <div>
                  <span className="badge bg-success rounded-pill fs-6 mb-3">
                    {tempProduct.category}
                  </span>
                </div>
                <p className="fs-5 my-3">
                  尺寸/包裝：{tempProduct.description}
                </p>
                <div className="h4">售價：NT$ {tempProduct.price} 元</div>
                <del className="fs-6 mb-3">
                  原價：NT$ {tempProduct.origin_price} 元
                </del>
                <div className="mb-2 mt-auto">
                  <div className="input-group">
                    <select
                      disabled={isCartLoading}
                      className="form-select"
                      id="inputGroupSelect02"
                      onChange={(e) => setQtySelect(e.target.value)}
                      value={qtySelect}
                    >
                      {Array.from({ length: 10 }).map((_, index) => (
                        <option key={index} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      disabled={isLoading}
                      className="btn btn-success d-flex justify-content-center gap-2"
                      onClick={addToCart}
                    >
                      {isLoading && (
                        <ReactLoading
                          type={"spin"}
                          color={"#000"}
                          height={"1.5rem"}
                          width={"1.5rem"}
                        />
                      )}
                      <div>加入購物車</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </>
        )}
        <div className="row mt-3">
          <div className="col-lg-8 col-12">
            <p className="fs-4 fw-bold">商品資訊：</p>
            <p className="fs-5"> {tempProduct.content} </p>
            <br />
            <p className="fs-4 fw-bold">保存方式：</p>
            <p className="fs-5"> {tempProduct.presever} </p>
          </div>
        </div>
        <hr />
        <p className="fs-2 fw-bold text-center my-5">相關商品</p>
        <div className="swiper-container position-relative" data-aos="fade-up" data-aos-duration="1000" data-aos-once="false">
          {dataReady ? (
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              autoplay={true}
              loop={true}
              spaceBetween={10}
              navigation={true}
              pagination={{ clickable: true }}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                  slidesPerGroup: 1,
                },
                992: {
                  slidesPerView: 4,
                  slidesPerGroup: 1,
                },
              }}
            >
              {products.map((product) => (
                <SwiperSlide key={product.id} >
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              autoplay={true}
              spaceBetween={10}
              loop={true}
              navigation={true}
              pagination={{ clickable: true }}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                  slidesPerGroup: 1,
                },
                992: {
                  slidesPerView: 4,
                  slidesPerGroup: 1,
                },
              }}
            >
              <SwiperSlide>
                {" "}
                <ProductCard product={{}} />
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <ProductCard product={{}} />
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <ProductCard product={{}} />
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <ProductCard product={{}} />
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <ProductCard product={{}} />
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <ProductCard product={{}} />
              </SwiperSlide>
            </Swiper>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductPage;
