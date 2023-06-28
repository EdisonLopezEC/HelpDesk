import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../layout/LayoutPublic";
import HomePage from "../pages/HomePage";
import ClassifyPage from "../pages/ClassifyPage";
import SignInSide from "../components/SignInSide";
import TechnicalPage from "../pages/TechnicalPage";
import SorterPage from "../pages/SorterPage";

export const routerTechnical = createBrowserRouter([
  {
    path: `${process.env.PUBLIC_URL}/`,
    element: <LayoutPublic />,
    children: [
        {
           path: `${process.env.PUBLIC_URL}/`,
            element: <HomePage/>,
            exact: true
          },
          {
            path: `${process.env.PUBLIC_URL}/technical`,
            element: <TechnicalPage/>,
            exact: true
          }
    ]
  },  
]);