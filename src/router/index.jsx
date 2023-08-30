import { Navigate, createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../layout/LayoutPublic";
import HomePage from "../pages/HomePage";
import ClassifyPage from "../pages/ClassifyPage";
import SignInSide from "../components/SignInSide";
import TechnicalPage from "../pages/TechnicalPage";
import PageNotFound from "../pages/PageNotFound";

export const router = createBrowserRouter([
  {
    path: `${process.env.PUBLIC_URL}/`,
    element: <LayoutPublic />,
    children: [
        {
           path: `${process.env.PUBLIC_URL}/`,
            // path: "/",
            element: <HomePage/>,
            exact: true
          },
          {
            path: `${process.env.PUBLIC_URL}/classify`,
            // path: "/classify",
            element: <ClassifyPage/>,
            exact: true

          },
          {
            path: `${process.env.PUBLIC_URL}/technical`,
            // path: "/technical",
            element: <TechnicalPage/>,
            exact: true
          },
          {
            path: "*",
            element: <PageNotFound/>
          }
    ]
  },

  
]);
