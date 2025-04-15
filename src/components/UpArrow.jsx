import { useEffect, useState } from "react";

function UpArrow() {
  const [isVisible, setIsVisble] = useState(false);
  const handleScroll = () => {
    if (window.scrollY < 30) setIsVisble(false);
    else setIsVisble(true);
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      {isVisible && (
        <div className="fixed-bottom text-end pe-3 pb-4">
          <div>
            <button
              type="button"
              className="bg-transparent border-0 text-secondary fw-bold up-btn"
              aria-label="scroll to top of the page"
              onClick={scrollToTop}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                fill="currentColor"
                className="bi bi-arrow-up-circle"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default UpArrow;
