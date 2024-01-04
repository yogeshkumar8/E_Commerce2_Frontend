
import { useEffect, useState } from "react";
import Spinner from "../component/Spinner";
import Product from "../component/Product";
import Navbar from "../component/Navbar";

const Home = () => {
  const API_URL = "https://dummyjson.com/products";

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  async function fetchProductData() {
    setLoading(true);

    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setPosts(data.products);
      setFilteredPosts(data.products); // Initialize filteredPosts with all products
      // console.log(data.products);
    } catch (error) {
      console.log("Error happened");
      setPosts([]);
      setFilteredPosts([]);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchProductData();
  }, []);

  const handleSearch = () => {
    const filteredResults = posts.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(searchTerm.toLowerCase());

      // Price filtering logic
      const price = parseFloat(post.price);
      const min = minPrice !== "" ? parseFloat(minPrice) : Number.MIN_SAFE_INTEGER;
      const max = maxPrice !== "" ? parseFloat(maxPrice) : Number.MAX_SAFE_INTEGER;
      const priceMatch = price >= min && price <= max;

      return titleMatch && priceMatch;
    });

    setFilteredPosts(filteredResults);
  };

  return (

    <div>
      <Navbar/>
      <div className="container w-11/12 mx-auto p-4">
        <div className="mb-4 mt-4 pl-4">
          <input
            type="text"
            placeholder="Search by title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <button onClick={handleSearch} className="p-2 bg-gray-500 text-white rounded ml-2">
            Search and Filter
          </button>
        </div>

        <div className="mb-4 pl-4">
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="p-1 border border-gray-300 rounded"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="p-1 border border-gray-300 rounded ml-2"
          />
        </div>

        {loading ? (
          <Spinner />
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {filteredPosts.map((post) => (
              <Product key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p>Not Found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
