import { createBrowserRouter } from "react-router-dom";
import Devis from "../PAGES/devis";
import Aboutt from "../PAGES/about";
import Home from "../PAGES/Home";
import Login from "../PAGES/login";
import Profil from "../PAGES/profil";
import Layout from "../layouts/layout";
import NotFound from "../PAGES/not";
import Productfull from "../components/productFull";
import Accessor from "../PAGES/configure";


export const router = createBrowserRouter([
    {
        element:<Layout/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/about',
                element:<Aboutt />
            },
            {
                path:'/devis',
                element:<Devis/>
            },
            {
                path:'/login',
                element:<Login/>
            },
            {
                path:'/profil',
                element:<Profil/>
            },
            {
                path:'/accessor',
                element:<Accessor/>
            },
            {
                path:'/Details/:id/:type',
                element:<Productfull/>
            },
            
        ],
    },
    {
        path:'*',
        element:<NotFound/>,
    },
])