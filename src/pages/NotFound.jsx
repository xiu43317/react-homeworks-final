function NotFound() {
  return (
      <div className="container">
        <div className="row vh-100 align-items-center">
          <div className="text-center">
            <div className="frame mx-auto" style={{maxWidth:"300px"}}>
              <img
                src="https://www.alucare.fr/wp-content/uploads/2023/01/emoji-visage-qui-pleure.png"
                className="img-fluid img-thumbnai"
                alt="查無此頁面"
              />
            </div>
            <h1>404</h1>
            <h2>這頁找不到</h2>
            <a href="#/" className="fs-4">
              回首頁
            </a>
          </div>
        </div>
      </div>
  );
}

export default NotFound;
