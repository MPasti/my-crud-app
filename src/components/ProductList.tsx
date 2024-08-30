import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../services/api";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Product {
  id: string;
  titulo: string;
  autor: string;
  ano: number;
  genero: string;
  numeroPaginas: number;
}
function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    loadProducts();
  }, []);
  const loadProducts = async () => {
    const response = await getProducts();
    setProducts(response.data);
  };
  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      loadProducts();
      toast.success("Produto deletado com sucesso!");
    } catch (e) {
      console.error(e)
      toast.error("Erro ao deletar o produto.");
    }
  };
  return (
    <div className="book-list">
      <h2>Lista de livros</h2>
      <Link to="/add" className="button">
        Novo Produto
      </Link>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.titulo} - {product.autor} - {product.ano}
            <Link className="edit" to={`/edit/${product.id}`}>
              Editar
            </Link>
            <button onClick={() => handleDelete(product.id)}>Deletar</button>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
}
export default ProductList;
