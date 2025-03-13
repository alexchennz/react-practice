import { useRef, useState } from "react";
import Input from "./components/Input";
import ProductList from "./components/ProductList";


function App() {
  const inputRef = useRef(null);

  const handleClick = () => {
    alert(`Input Value: ${inputRef.current.value}`);
  };


  async function handleSubmit() {
    try {
      const response = await fetch("https://dummyjson.com/posts/add", {
        method: "POST", // Specify the HTTP method
        headers: {
          "Content-Type": "application/json", // Tell the API we are sending JSON
        },
        body: JSON.stringify({  
          title: "New Post",
          userId: 3
        }) // Convert the object to JSON format
      })
      if(response.ok){
        const result = await response.json();
        console.log(result);
      }
      else{
        console.error("Failed to submit user:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting user:", error);
    }
  };

  const updateProduct = async (productID, title) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${productID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // ✅ Tells the API we're sending JSON
        },
        body: JSON.stringify({
          title
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Something went wrong: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Product updated successfully:", data); // ✅ Log success response
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const deleteProduct = async (postId) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${postId}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error(`Error deleting product: ${response.statusText}`);
      }
  
      const result = await response.json(); // ✅ Added `await`
      console.log("Successfully deleted product.", result); // ✅ Log response (if needed)
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <Input ref={inputRef} placeholder="Enter a number" />
      <button onClick={handleClick}>Get Input Value</button>
      <h3>Fetch Post - Send Post</h3>
      <button onClick={handleSubmit}>Submit Post</button>
      <h3>Fetch Update - Update Product</h3>
      <button onClick={()=>updateProduct(5, "iPhone 15")}>Update Product</button>
      <h3>Fetch Delete - Delete Product</h3>
      <button onClick={()=>{if(window.confirm("Are you sure you want to delete this product?"))deleteProduct(1)}}>Delete Product</button>
      <h3>Fetch Get - Product List</h3>
      <ProductList />
    </>
  );
}

export default App
