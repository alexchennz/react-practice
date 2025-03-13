import ProductList from "./ProductList";

const FetchExample = () => {
  const handleSubmit = async () => {
    try {
      const response = await fetch("https://dummyjson.com/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "New Post", userId: 3 }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
      } else {
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) throw new Error(`Something went wrong: ${response.statusText}`);

      const data = await response.json();
      console.log("Product updated successfully:", data);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const deleteProduct = async (postId) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${postId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error(`Error deleting product: ${response.statusText}`);

      const result = await response.json();
      console.log("Successfully deleted product.", result);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <section>
        <h2>Send Data</h2>
        <button onClick={handleSubmit}>Submit Post</button>
      </section>
      
      <section>
        <h2>Update Data</h2>
        <button onClick={() => updateProduct(5, "iPhone 15")}>Update Product</button>
      </section>
      
      <section>
        <h2>Delete Data</h2>
        <button onClick={() => { if (window.confirm("Are you sure?")) deleteProduct(1); }}>Delete Product</button>
      </section>
      
      <section>
        <h2>Fetch Data</h2>
        <ProductList />
      </section>
    </>
  );
};

export default FetchExample;