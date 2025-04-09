import "../../assets/css/noticepage.css"

function NoticePage() {
  return (
      <div className="container mh-380">
        <h3 className="fs-2 mx-auto my-5 text-center">購買須知</h3>
        <div className="accordion mw-800 mx-auto fs-5" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                訂單取消政策
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                為確保訂單順利進行，我們對未支付的訂單設定了三天的付款期限。
                若在此期限內未收到付款，訂單將自動取消。
                這樣的政策旨在確保庫存和預訂管理的有效性，
                同時也為顧客提供清晰的購買準則，以免造成不必要的誤解或不便。
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                全程低溫保鮮運送
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                我們的甜點運送過程全程採用低溫宅配，
                確保甜點在運送過程中保持新鮮。我們專業團隊精心包裝您的甜點，
                並使用專業冷藏設備確保溫度穩定。
                這樣的運送方式不僅能夠保持甜點的口感和質量，
                還能讓您在收到甜點時感受到與店內購買一樣的美味和品質。
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                甜點保存方式
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                蛋糕應放置於冰箱中，用保鮮膜包裹，可保存2至3天。
                馬卡龍應置於密封容器中，放置於冰箱中，可保存3至4天。
                千層酥應置於冰箱中，用保鮮膜包裹，可保存2至3天。
                閃電泡芙應放置於冷藏庫中，避免潮濕，可保存1至2天。室溫下保存時間較短，
                建議在使用前將其放置於室溫下15至30分鐘使其回復至最佳狀態。
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFour">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
                aria-expanded="false"
                aria-controls="collapseFour"
              >
                飲品搭配建議
              </button>
            </h2>
            <div
              id="collapseFour"
              className="accordion-collapse collapse"
              aria-labelledby="headingFour"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                蛋糕可搭配香濃咖啡或清爽茶飲，增添品嚐體驗。馬卡龍搭配花草茶或濃郁卡布奇諾，彼此味道相輔相成。
                千層酥適合搭配淡雅紅茶或香醇拿鐵，酥脆口感與茶香相得益彰。閃電泡芙與香濃拿鐵或清爽水果茶搭配，
                甜點與飲品相互襯托，令人愉悅。
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFive">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFive"
                aria-expanded="false"
                aria-controls="collapseFive"
              >
                營業時間
              </button>
            </h2>
            <div
              id="collapseFive"
              className="accordion-collapse collapse"
              aria-labelledby="headingFour"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                我們的營業時間為禮拜一至禮拜五，下午3點至晚上9點。
                這段時間內，我們將為您提供最新鮮的法式甜點。
                請在這段時間內前來品嚐我們的美味甜點，讓您的下午或晚上變得更加美好。期待您的光臨！
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingSix">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseSix"
                aria-expanded="false"
                aria-controls="collapseSix"
              >
                網路下訂取貨
              </button>
            </h2>
            <div
              id="collapseSix"
              className="accordion-collapse collapse"
              aria-labelledby="headingSix"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                感謝您在網路上下訂購我們的甜點！一旦您完成付款，我們將立即處理您的訂單。
                通常，甜點將在您下訂後約4天內送達。
                我們將採用快遞服務確保甜點以最快速度並安全地送達您的地址。
                期待您收到我們的精心製作的甜點，並享受美味的品嚐時刻！
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default NoticePage;
