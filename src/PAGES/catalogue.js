import Navvv from "../components/Navbar";
import Product from "../components/product";

export default function Catalogue() {
    const [products, setProducts] = useState([]);
    
    return (
        <div>
            <Navvv onSearchResults={setProducts} />
            <Product products={products} />
        </div>
    );
}