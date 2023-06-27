<<<<<<< HEAD
import { Navigate, createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../layout/LayoutPublic";
import HomePage from "../pages/HomePage";
import ClassifyPage from "../pages/ClassifyPage";
import SignInSide from "../components/SignInSide";
import TechnicalPage from "../pages/TechnicalPage";

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
            path: `${process.env.PUBLIC_URL}/login`,
            // path: "/login",
            element: <SignInSide/>,
            exact: true

          },
          {
            path: `${process.env.PUBLIC_URL}/technical`,
            // path: "/technical",
            element: <TechnicalPage/>,
            exact: true
          }
    ]
  },

  
]);

// import { Route, Navigate } from "react-router-dom";
// import { useContext } from "react";
// import { UserContext } from "../context/UserContext";
// import { createBrowserRouter } from "react-router-dom";
// import LayoutPublic from "../layout/LayoutPublic";
// import HomePage from "../pages/HomePage";
// import ClassifyPage from "../pages/ClassifyPage";
// import SignInSide from "../components/SignInSide";


// function PrivateRoute({ path, element }) {
//   const { user } = useContext(UserContext);

//   if (user.login) {
//     return <Route path={path} element={element} />;
//   } else {
//     return <Navigate to="/login" replace />;
//   }
// }

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <LayoutPublic />,
//     children: [
//       {
//         path: "/",
//         element: <HomePage />,
//         exact: true,
//       },
//       {
//         path: "/classify",
//         element: <PrivateRoute path="/classify" element={<ClassifyPage />} />,
//         exact: true,
//       },
//       {
//         path: "/login",
//         element: <SignInSide />,
//         exact: true,
//       },
//     ],
//   },
// ]);
=======
import { Navigate, createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../layout/LayoutPublic";
import HomePage from "../pages/HomePage";
import ClassifyPage from "../pages/ClassifyPage";
import SignInSide from "../components/SignInSide";
import TechnicalPage from "../pages/TechnicalPage";

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
            path: `${process.env.PUBLIC_URL}/login`,
            // path: "/login",
            element: <SignInSide/>,
            exact: true

          },
          {
            path: `${process.env.PUBLIC_URL}/technical`,
            // path: "/technical",
            element: <TechnicalPage/>,
            exact: true
          }
    ]
  },

  
]);

// import { Route, Navigate } from "react-router-dom";
// import { useContext } from "react";
// import { UserContext } from "../context/UserContext";
// import { createBrowserRouter } from "react-router-dom";
// import LayoutPublic from "../layout/LayoutPublic";
// import HomePage from "../pages/HomePage";
// import ClassifyPage from "../pages/ClassifyPage";
// import SignInSide from "../components/SignInSide";


// function PrivateRoute({ path, element }) {
//   const { user } = useContext(UserContext);

//   if (user.login) {
//     return <Route path={path} element={element} />;
//   } else {
//     return <Navigate to="/login" replace />;
//   }
// }

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <LayoutPublic />,
//     children: [
//       {
//         path: "/",
//         element: <HomePage />,
//         exact: true,
//       },
//       {
//         path: "/classify",
//         element: <PrivateRoute path="/classify" element={<ClassifyPage />} />,
//         exact: true,
//       },
//       {
//         path: "/login",
//         element: <SignInSide />,
//         exact: true,
//       },
//     ],
//   },
// ]);
>>>>>>> 249c57bfc6d68c4a5b435e819488e329cb6924d6
