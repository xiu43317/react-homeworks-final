import { createHashRouter } from "react-router-dom";
import Homelayout from "../pages/user/HomeLayout";
import IntroPage from "../pages/user/IntroPage";
import AboutUs from "../pages/user/AboutUs";
import NotFound from "../../src/pages/NotFound";
import AdminLogin from "../pages/admin/AdminLogin";
import NewsPage from "../pages/user/NewsPage";
import NewsOnePage from "../pages/user/NewsOnePage";
import ProductsPage from "../pages/user/ProductsPage";
import NoticePage from "../pages/user/NoticePage";
import ProductPage from "../pages/user/ProductPage";
import SearchOrderPage from "../pages/user/SearchOrderPage";
import CheckPageLayout from "../pages/user/CheckPagelayout"
import PaymentPage from "../pages/user/PaymentPage"
import AdminDashboard from "../pages/admin/AdminDashboard"
import AdminProducts from "../pages/admin/AdminProducts"
import AdminOrder from "../pages/admin/AdminOrder"
import AdminArticle from "../pages/admin/AdminArticle"
import AdminCoupon from "../pages/admin/AdminCoupon"

const router = createHashRouter([
  {
    path:"/login",
    element:<AdminLogin/>
  },
  {
    path: "/",
    element: <Homelayout />,
    children: [
      {
        path: "",
        element: <IntroPage />,
      },
      {
        path: "introduction",
        element: <IntroPage />,
      },
      {
        path: "aboutus",
        element: <AboutUs />,
      },
      {
        path: "news",
        element: <NewsPage />,
      },
      {
        path: "onenews/:id/num/:num",
        element: <NewsOnePage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path:"notice",
        element:<NoticePage/>
      },
      {
        path: "product/:id",
        element: <ProductPage />,
      },
      {
        path: "orders",
        element: <SearchOrderPage />,
      },
      {
        path: "check",
        element:<CheckPageLayout/>
      },
      {
        path: "payment",
        element:<PaymentPage/>
      },
    ],
  },
  {
    path:"/admin",
    element:<AdminDashboard/>,
    children:[
      {
        path:"",
        element:<AdminProducts/>
      },
      {
        path:"products",
        element:<AdminProducts/>
      },
      {
        path:"coupons",
        element:<AdminCoupon/>
      },
      {
        path:"orders",
        element:<AdminOrder/>
      },
      {
        path:"articles",
        element:<AdminArticle/>
      }
    ]
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
