import React, { useState } from "react";
import InputShort from "../atoms/InputShort";
import Button from '../atoms/Button';
import InputRange from "../atoms/InputRange";
import "../styles/molecules/ModalFiltroProductos.css"

function ModalFiltroProductos(props) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500000);


  const toggleFilterMenu = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const toggleCategoriesMenu = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const handleMinPriceChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - 1);
    setMinPrice(value);
  };

  const handleMaxPriceChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + 1);
    setMaxPrice(value);
  };

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const categoriesRendered = props.categories.map(category => (
    <option key={category.id_Categorias} onClick={(e) => handleApplyChangesByCategorie(e)} value={category.id_Categorias}>
      {category.nombreCategoria}
    </option>
  ))
  
  const handleApplyChangesByPrice = () => {
    let productsFilteredAux = []
    toggleFilterMenu();
    
    props.productosComplete.map((prod) => {
      if(prod.price >= minPrice && prod.price <= maxPrice)
        productsFilteredAux.push(prod)
    })
    props.setProductosFiltered(productsFilteredAux)
  }

  const handleApplyChangesByCategorie = (e) => {
    let productsFilteredAux = []
    toggleFilterMenu();
    
    props.productosComplete.map((prod) => {
      console.log('IDCAT: ', e.target)
      if(e.target.value === prod.category_id)
        productsFilteredAux.push(prod)
    })
    props.setProductosFiltered(productsFilteredAux)
  }

  return (
    <div className="navbar-center">
      <button className="filter-btn" onClick={toggleFilterMenu}>
        Filtrar <i className="fa-solid fa-chevron-down filter-icon"></i>
      </button>
      <div className={`filter-menu ${isFilterOpen ? 'open' : ''}`}>
        <button className="category-btn" onClick={toggleCategoriesMenu}>
          Categorías   <i className="fa-solid fa-chevron-right categories-icon"></i>
        </button>
        {isCategoriesOpen && (
          <ul className="categories-list">
            {categoriesRendered}
          </ul>
        )}
        <button className="button-1">Ordenar (más caros primero)</button>
        <button className="button-2">Ordenar (más baratos primero)</button>
        <div className="price-range">
          <label>Rango de precio:</label>
          <div className="price-inputs">
            <InputShort
              text="Min"
              var={minPrice} handleVarChange={handleMinPriceChange}
            />
            <InputShort
              text="Max"
              var={maxPrice} handleVarChange={handleMaxPriceChange}
            />
          </div>
          <div className="range-slider">
            <InputRange
              var={minPrice}
              handleVarChange={handleMinPriceChange}  className="thumb thumb-left"
            />
            <InputRange
              var={maxPrice}
              handleVarChange={handleMaxPriceChange} className="thumb thumb-right"
            />
            <div className="slider-track"></div>
            <div className="slider-range" style={{ left: `${minPrice}%`, right: `${500000 - maxPrice}%` }}></div>
          </div>
          <Button label='Aplicar' className='btn-apply-fitler' onClick={handleApplyChangesByPrice}/>
        </div>
      </div>
      <input type="text" placeholder="Buscar" className="search-bar" />
    </div>
  )
}

export default ModalFiltroProductos;