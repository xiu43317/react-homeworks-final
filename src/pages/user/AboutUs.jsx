function AboutUs() {
  return (
    <div className="container" style={{ overflowX: "hidden" }}>
      <div className="text-center">
        <h3 className="fs-2 my-3 my-lg-5 mx-auto">關於我們</h3>
      </div>
      <div className="row mt-3">
        <div
          className="col-12 col-lg-6"
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-once="false"
        >
          <img
            src="https://images.unsplash.com/photo-1519733870-f96bef9bc85f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVzc2VydCUyMGNoZWZ8ZW58MHx8MHx8fDA%3D"
            alt="創店起因"
            className="img-fluid object-fit-cover rounded"
          />
        </div>
        <div
          className="col-12 col-lg-6"
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-once="false"
        >
          <h3 className="mt-lg-0 fs-3 mt-3">羅傑創店的緣由</h3>
          <hr />
          <p className="fs-4">
            我深愛法國文化，特別是法式烘焙藝術。這份熱情驅使我創立了一家法式甜點店。
            我希望透過甜點，將法國的浪漫和美好帶給更多人，讓顧客在品嚐甜點的同時，
            也能感受到法國文化的魅力。我的目標是提供精緻美味的法式點心，
            讓人們在忙碌生活中找到片刻的寧靜和享受。
          </p>
        </div>
      </div>
      <div className="row mt-3">
        <div
          className="col-12 col-lg-6 order-lg-1"
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-once="false"
        >
          <img
            src="https://plus.unsplash.com/premium_photo-1664474581687-080655b479fd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZGVzc2VydCUyMGNoZWZ8ZW58MHx8MHx8fDA%3D"
            alt="食材嚴格挑選"
            className="img-fluid object-fit-cover rounded"
          />
        </div>
        <div
          className="col-12 col-lg-6"
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-once="false"
        >
          <h3 className="mt-3 fs-3">嚴選新鮮的食材</h3>
          <hr />
          <p className="fs-4">
            嚴選甜點食材是確保甜點品質的關鍵。我們精心挑選新鮮、
            高品質的原材料，如頂級巧克力、新鮮水果和純正奶油，
            以確保甜點口感和風味的最佳表現。這些優質食材不僅提供了絕佳的口感
            ，更讓顧客感受到我們對品質的堅持和用心。
          </p>
        </div>
      </div>
      <div className="row mt-3">
        <div
          className="col-12 col-lg-6"
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-once="false"
        >
          <img
            src="https://plus.unsplash.com/premium_photo-1664478052858-d137d26e2cfd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGRlc3NlcnQlMjBjaGVmfGVufDB8fDB8fHww"
            alt="持續創新"
            className="img-fluid object-fit-cover rounded"
          />
        </div>
        <div
          className="col-12 col-lg-6"
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-once="false"
        >
          <h3 className="mt-3 fs-3">持續創造新產品</h3>
          <hr />
          <p className="fs-4">
            我們不斷探索和創新，將傳統法式甜點與現代風格融合。
            透過獨特的配料組合和創意的裝飾，我們為客戶帶來驚喜和新鮮感。
            從經典的馬卡龍到創意十足的季節性甜點，
            我們致力於提供一系列精緻美味的法式點心，
            滿足客戶的味蕾並持續啟發他們的味覺體驗。
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
