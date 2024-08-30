import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createProduct, getProductById, updateProduct } from "../services/api";

interface Product {
  titulo: string;
  autor: string;
  ano: number;
  genero: string;
  numeroPaginas: number;
}

function ProductForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product>({
    titulo: "",
    autor: "",
    ano: 0,
    genero: "",
    numeroPaginas: 0,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      const response = await getProductById(id as string);
      setProduct(response.data);
    } catch (error) {
      console.error("Erro ao carregar informações de produtos", error);
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!product.titulo) newErrors.titulo = "Título é obrigatório.";
    if (!product.autor) newErrors.autor = "Autor é obrigatório.";
    if (product.ano <= 0) newErrors.ano = "Ano deve ser maior que 0.";
    if (!product.genero) newErrors.genero = "Gênero é obrigatório.";
    if (product.numeroPaginas <= 0)
      newErrors.numeroPaginas = "Número de páginas deve ser maior que 0.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      [e.target.name]:
        e.target.type === "number"
          ? parseFloat(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        if (id) {
          await updateProduct(id, product);
        } else {
          await createProduct(product);
        }
        navigate("/");
      } catch (error) {
        console.error("Error saving product", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Título</label>
        <input
          type="text"
          name="titulo"
          value={product.titulo}
          onChange={handleChange}
        />
        {errors.titulo && <p className="error">{errors.titulo}</p>}
      </div>
      <div>
        <label>Autor</label>
        <input
          type="text"
          name="autor"
          value={product.autor}
          onChange={handleChange}
        />
        {errors.autor && <p className="error">{errors.autor}</p>}
      </div>
      <div>
        <label>Ano de publicação</label>
        <input
          type="number"
          name="ano"
          value={product.ano}
          onChange={handleChange}
        />
        {errors.ano && <p className="error">{errors.ano}</p>}
      </div>
      <div>
        <label>Gênero</label>
        <input
          type="text"
          name="genero"
          value={product.genero}
          onChange={handleChange}
        />
        {errors.genero && <p className="error">{errors.genero}</p>}
      </div>
      <div>
        <label>Número de páginas</label>
        <input
          type="number"
          name="numeroPaginas"
          value={product.numeroPaginas}
          onChange={handleChange}
        />
        {errors.numeroPaginas && (
          <p className="error">{errors.numeroPaginas}</p>
        )}
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
}

export default ProductForm;
