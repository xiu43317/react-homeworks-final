import "../../assets/css/intro.css";
import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import "swiper/css";
import NewCard from "../../components/NewCard";
import ClassicDessert from "../../components/ClassicDessert";
import ProductCard from "../../components/ProductCard";
import { notify } from "../../api/toast";
import ReactLoading from "react-loading";

function IntroPage() {
  const [swiper, setSwiper] = useState(null);
  const nexto = (e) => {
    e.preventDefault();
    swiper.slideNext();
  };
  const prevto = (e) => {
    e.preventDefault();
    swiper.slidePrev();
  };
  const [articles, setArticles] = useState([]);
  const [hotProducts, setHotProducts] = useState([]);
  const [dataReady, setDataReady] = useState(false);
  const getArticles = (page) => {
    api
      .getArticles(page)
      .then((res) => {
        setArticles([...res.data.articles]);
      })
      .catch((err) => {
        notify(false, err.response.message);
      });
  };
  const getProducts = (page) => {
    api
      .getProducts(page)
      .then((res) => {
        setHotProducts([...res.data.products.filter((item) => item.stars > 4)]);
        setDataReady(true);
      })
      .catch((err) => {
        notify(false, err.response.data.message);
      });
  };
  useEffect(() => {
    getArticles();
  }, []);
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      {" "}
      {!dataReady && (
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
      <div className="container-fluid">
        <div
          className="hero-image"
          data-aos="fade-zoom-in"
          data-aos-offset="200"
          data-aos-easing="ease-in-sine"
          data-aos-duration="600"
        >
          <div className="hero-text">
            <h1>歡迎光臨羅傑之家</h1>
            <p className="fs-4">我們提供法國道地的經典甜點</p>
            <NavLink to="/products" className="rounded fs-5">
              產品一覽
            </NavLink>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="mt-5 mb-4 text-center">
          <h4 className="h2">最新消息</h4>
        </div>
        <div className="row">
          {articles.map((article, index) => {
            if (index < 3 && article.isPublic)
              return <NewCard oneNews={article} key={article.id} />;
          })}
        </div>
      </div>
      <div className="container">
        <div className="mt-5 mb-4 text-center">
          <h4 className="h2">法式經典</h4>
        </div>
        <div className="row" style={{ overflowX: "hidden" }}>
          <ClassicDessert
            fade="fade-right"
            title="閃電泡芙"
            link="/products?category=泡芙"
            imgUrl="https://images.unsplash.com/photo-1508438943662-234d663bbfaa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fCVDMyVBOWNsYWlyfGVufDB8MHwwfHx8MA%3D%3D"
          />
          <ClassicDessert
            fade="fade-up"
            title="特色蛋糕"
            link="/products?category=蛋糕"
            imgUrl="https://media.istockphoto.com/id/1414484361/photo/delicious-fresh-fondant-with-hot-chocolate-and-mint-on-black-table-closeup.jpg?s=612x612&w=0&k=20&c=z7Ti0zZ_UIn09Xg4v3uQiKLk-VsOKomg5UbkQJNiEBE="
          />
          <ClassicDessert
            fade="fade-down"
            title="酥軟千層"
            link="/products?category=千層酥"
            imgUrl="https://images.unsplash.com/photo-1587122569949-ae6e755c6bdc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWlsbGUlMjBmZXVpbGxlfGVufDB8MHwwfHx8MA%3D%3D"
          />
          <ClassicDessert
            fade="fade-left"
            title="經典馬卡龍"
            link="/products?category=馬卡龍"
            imgUrl="https://images.unsplash.com/photo-1532063997725-c04d1abf7f67?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFjYXJvb258ZW58MHwwfDB8fHww"
          />
        </div>
      </div>
      <div className="container position-relative">
        <div className="mt-5 mb-4 text-center">
          <h4 className="h2">五星推薦</h4>
        </div>
        <div
          className="swiper-container"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-once="false"
        >
          {dataReady ? (
            <Swiper
              // install Swiper modules
              modules={[Autoplay, Navigation, Pagination]}
              autoplay={true}
              loop={true}
              spaceBetween={10}
              navigation={true}
              pagination={{ clickable: true }}
              onSwiper={(swiper) => {
                setSwiper(swiper);
              }}
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
              {hotProducts.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
              <a
                href="#"
                className="position-absolute top-50 start-0"
                style={{ zIndex: "100" }}
                onClick={(e) => prevto(e)}
              >
                <i className="bi bi-chevron-compact-left fs-1 text-dark"></i>
              </a>
              <a
                href="#"
                className="position-absolute top-50 end-0"
                style={{ zIndex: 100 }}
                onClick={(e) => nexto(e)}
              >
                <i className="bi bi-chevron-compact-right fs-1 text-dark"></i>
              </a>
            </Swiper>
          ) : (
            <Swiper
              // install Swiper modules
              modules={[Autoplay, Navigation, Pagination]}
              autoplay={true}
              spaceBetween={10}
              loop={true}
              navigation={true}
              pagination={{ clickable: true }}
              onSwiper={(swiper) => {
                setSwiper(swiper);
              }}
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

export default IntroPage;
