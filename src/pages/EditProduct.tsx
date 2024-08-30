import ProductForm from "../components/ProductForm";
import {Link} from "react-router-dom";
import {FaArrowLeftLong} from "react-icons/fa6";

function EditProduct() {
    return (
        <div className="product-container">
            <div className="header">
                <Link to="/">
                    <FaArrowLeftLong className="icon" />
                </Link>
                <h1 className="title">Editar Produto</h1>
            </div>
            <ProductForm />
        </div>
    );
}
export default EditProduct;
