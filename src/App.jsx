import React, { useState, useEffect } from 'react';

const App = () => {
  //-------Manejo de hooks y fetching-------
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const url = 'https://fakestoreapi.com/products/';

  const showData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    showData();
  }, []);

  //-------Manejo de borrado de producto-------
  const handleDelete = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const categories = [...new Set(products.map((product) => product.category))];

  return (
    //-------Filtrado de categorias-------
    <div className='bg-[#a2d2ff] text-black font-medium'>
      <label htmlFor="categorySelect">Filtrar por categoría:</label>
      <select
        id="categorySelect"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className='bg-[#fdf0d5]'
      >
        <option value="all">Todas las categorías</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      <table>
        <thead>
          <tr className='bg-[#bde0fe]'>
            <th>Título</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.filter((product) =>
            selectedCategory === 'all'
              ? true
              : product.category === selectedCategory).map((product, index) => (
                <tr key={index}>
                  <td>{product.title}</td>
                  <td>{product.description}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>
                    <button
                      className='bg-[#fdf0d5]' onClick={() => handleDelete(index)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;