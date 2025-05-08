import { Outlet } from "react-router-dom";
import Navvv from "../components/Navbar";
import MyFooter from "../components/footer";

export default function Layout(){
    return (<>
        <header>
            <Navvv />
        </header>
        <main>
            <Outlet/>
        </main>
        <footer>
            <MyFooter/>
        </footer>
    </>
    )
} 