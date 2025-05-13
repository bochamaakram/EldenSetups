import { createBrowserRouter } from "react-router-dom";
import Aboutt from "../PAGES/about";
import Contact from "../PAGES/Contact";
import Home from "../PAGES/Home";
import Login from "../PAGES/LoginRegister";
import BrowseByCategory from "../PAGES/BrowseByCategory";
import Profil from "../PAGES/profil";
import Layout from "../layouts/layout";
import NotFound from "../PAGES/not";
import Productfull from "../components/productFull";
import Accessor from "../PAGES/configure";
import Cart from "../PAGES/cart";


export const router = createBrowserRouter([
    {
        element:<Layout/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/products',
                element:<BrowseByCategory />
            },
            {
                path:'/about',
                element:<Aboutt />
            },
            {
                path:'/Contact',
                element:<Contact/>
            },
            {
                path:'/profil',
                element:<Profil/>
            },
            {
                path:'/Configer',
                element:<Accessor/>
            },
            {
                path:'/Details/:id/',
                element:<Productfull/>
            },
            {
                path:'/Cart',
                element:<Cart/>
            },
            
        ]},        
        {
            path:'/login',
            element:<Login/>
        },
        {
            path:'/signup',
            element:<Login/>
        },
    
    {
        path:'*',
        element:<NotFound/>,
    },
])