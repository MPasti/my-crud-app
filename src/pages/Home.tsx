import BookIcon from '../assets/book.svg';
import ProductList from "../components/ProductList.tsx";

function Home() {
  return (
      <div className="home">
          <h1>
              <img src={BookIcon} alt="Book Icon" style={{width: '50px', height: '50px', margin: '8px 8px -13px 0'}}/>
              Pasti's Book Store
          </h1>
          <ProductList/>
      </div>
  );
}

export default Home;
