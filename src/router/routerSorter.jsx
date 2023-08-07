import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../layout/LayoutPublic";
import HomePage from "../pages/HomePage";
import ClassifyPage from "../pages/ClassifyPage";
import SignInSide from "../components/SignInSide";
import SorterPage from "../pages/SorterPage";
import PageNotFound from "../pages/PageNotFound";

export const routerSorter = createBrowserRouter([
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
            path: `${process.env.PUBLIC_URL}/categorizador`,
            element: <SorterPage/>,
            exact: true
          },
          {
            path: "*",
            element: <PageNotFound/>
          }
    ]
  },  
]);