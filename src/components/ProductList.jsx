import { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]); // ✅ Declare state
  const [error, setError] = useState(null); // ✅ Track errors

  useEffect(() => {
    let isMounted = true; // ✅ Prevent setting state if component unmounts

    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products?limit=10');
        if (!response.ok) {
          throw new Error(`Error fetching products: ${response.statusText}`);
        }
        const data = await response.json();
        if (isMounted) {
          setProducts(data.products);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false; // ✅ Cleanup to prevent memory leak
    };
  }, []);


    //ALTERNATIVE WAY: ABORTING THE FETCH REQUEST
    //A better approach would be to cancel the request itself using the AbortController API:

    //   useEffect(() => {
    //     const controller = new AbortController();
    //     const signal = controller.signal;
    
    //     const fetchProducts = async () => {
    //       try {
    //         const response = await fetch("https://dummyjson.com/products?limit=10", { signal });
    //         if (!response.ok) {
    //           throw new Error(`Error fetching products: ${response.statusText}`);
    //         }
    //         const data = await response.json();
    //         setProducts(data.products);
    //       } catch (err) {
    //         if (err.name !== "AbortError") {
    //           setError(err.message);
    //         }
    //       }
    //     };
    
    //     fetchProducts();
    
    //     return () => {
    //       controller.abort(); // Cancels the fetch request when the component unmounts
    //     };
    //   }, []);
  


  if (error) return <p>{error}</p>; // ✅ Display error if any

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}><div>Name: {product.title}</div> <div>Description: {product.description}</div> </li>
      ))}
    </ul>
  );
};

export default ProductList;