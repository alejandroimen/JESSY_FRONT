
import React, { useState, useEffect } from 'react';
import Logo from '../atoms/Logo';
import ModalProductManagement from '../molecules/ModalProductManagement';
import ModalEditProductManagement from '../molecules/ModalEditProductManagement';
import ModalDeleteProductManagement from '../molecules/ModalDeleteProductManagement';
import ModalFiltroProductos from '../molecules/ModalFiltroProductos';
import SidebarMenu from '../molecules/SidebarMenu';
import UserProfile from '../molecules/UserProfile';
import axios from 'axios';
import '../styles/pages/ProductManagement.css';

const ProductManagement = () => {
    const [isOpenUser, setIsOpenUser] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productos, setProductos] = useState([]);
    const [productosFiltered, setProductosFiltered] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category_id, setCategory_id] = useState('');
    const [image, setImage] = useState(null);
    const [available_quantity, setAvailable_quantity] = useState('');
    const [provider_id, setProvider_id] = useState('');
    const [categories, setCategories] = useState([]);
    const [providers, setProviders] = useState([]);
    const [deleteProduct, setDeleteProduct] = useState(false);
    const [editProduct, setEditProduct] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        fetchProductos();
        fetchCategories();
        fetchProviders();
    }, []);

    const fetchProductos = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('https://jessyapi.integrador.xyz/products/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': `application/json`
                }
            });
            setProductos(response.data);
            setProductosFiltered(response.data)
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('https://jessyapi.integrador.xyz/categorias', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('CATS', response.data)
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchProviders = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('https://jessyapi.integrador.xyz/proveedores', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProviders(response.data);
        } catch (error) {
            console.error('Error fetching providers:', error);
        }
    };

    const handleAddProducto = async () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('price', price);
        formData.append('available_quantity', available_quantity);
        formData.append('description', description);
        formData.append('category_id', category_id);
        formData.append('file', image);

        try {
            await axios.post('https://jessyapi.integrador.xyz/products/', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            fetchProductos();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleImageUpload = (image) => {
        setImage({file: image});
    };

    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleDeleteToggle = async () => {
        if (!currentProduct || !currentProduct.id_ML) {
            console.error('ID de producto inválido');
            alert('ID de producto inválido');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            console.log(`Token de autorización: ${token}`); // Agrega este log
            console.log(`Eliminando producto con id_ML: ${currentProduct.id_ML}`);
            await axios.delete(`https://jessyapi.integrador.xyz/products/${currentProduct.id_ML}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Producto eliminado');
            fetchProductos();
            setDeleteProduct(false);
            setCurrentProduct(null);
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            alert('Error al eliminar el producto');
        }
    };

    const handleEditProducto = async () => {
        console.log("si llego");
        const formData = new FormData();
        formData.append('title', title);
        formData.append('price', price);
        formData.append('available_quantity', available_quantity);
        formData.append('description', description);
        formData.append('category_id', category_id);
        formData.append('file', image);
        console.log('este es la id categoria', category_id);
        console.log('este es la imagen', image);
    
        try {
            await axios.put(`https://jessyapi.integrador.xyz/products/${currentProduct.id_ML}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json'
                }
            });
            fetchProductos();
            setEditProduct(false);
        } catch (error) {
            console.error('Error editing product:', error);
        }
    };

    const handleEditToggle = () => {
        setEditProduct(!editProduct);
        setCurrentProduct(null);
        setProviders('');
        setCategory_id('');
        setPrice('');
        setTitle('');
        setDescription('');
        setAvailable_quantity('');
        setImage('');
    };

    const productsRendered = productosFiltered.map(producto => (
        <div className="product-item" key={producto.id}>
            <button className="edit-btn">
                <div className="red-square"></div>
            </button>
            <div className="product-details">
                <p className='title'>{producto.title}</p>
                <p className='price'>${producto.price}</p>
                <p>{producto.available_quantity}</p>
                <p>{producto.provider_name}</p>
            </div>
            <div className="product-actions">
                <button className="add-pencil-btn" onClick={() => {
                    setCurrentProduct(producto);
                    setAvailable_quantity(producto.available_quantity);
                    setCategory_id(producto.category_id);
                    setPrice(producto.price);
                    setDescription(producto.description);
                    setTitle(producto.title);
                    setImage(producto.image);
                    setEditProduct(true);
                }}>
                    <i className="fa-solid fa-pencil"></i>
                </button>
                <button className="delete-btn" onClick={() => {
                    setCurrentProduct(producto);
                    setDeleteProduct(true);
                }}>
                    <i className="fas fa-trash"></i>
                </button>
            </div>
        </div>
    ))

    const handleModalToggleEdit = ()=> {
        setEditProduct(false)
        setCategory_id('')
        setTitle('')
        setDescription('')
        setAvailable_quantity(0)
        setPrice(0)
    }

    return (
        <div className="product-management">
            <header className="navbar">
                <div className="navbar-left">
                    <SidebarMenu isOpen={isOpen} toggleMenu={toggleMenu} />
                    <div className="header-line">
                        <Logo className="custom-logo" />
                    </div>
                </div>
                <ModalFiltroProductos productosComplete = {productos} productosFiltered = {productosFiltered} setProductosFiltered = {setProductosFiltered} categories={categories} />
                <div className="navbar-right">
                    <UserProfile isOpenUser = {isOpenUser} setIsOpenUser = {setIsOpenUser} />
                </div>
            </header>
            <div className="content-products-management">
                <div className="actions-products-management">
                    <div className="left-actions-products-management">
                        <h1>Gestión de productos</h1>
                    </div>
                    <div className="right-actions-products-management">
                        <i className="fa-solid fa-plus new-product-btn" onClick={handleModalToggle}></i>
                    </div>
                </div>
                <div className="product-list-container">
                    <div className="product-list">
                        {productsRendered}
                    </div>
                </div>
            </div>
            <ModalProductManagement
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                title={title}
                price={price}
                available_quantity={available_quantity}
                categories={categories}
                providers={providers}
                setTitle={setTitle}
                setPrice={setPrice}
                setAvailable_quantity={setAvailable_quantity}
                setCategory_id={setCategory_id}
                setProvider_id={setProvider_id}
                handleAddProducto={handleAddProducto}
                setDescription={setDescription}
                handleImageUpload={handleImageUpload}
            />
            <ModalDeleteProductManagement
                isOpen={deleteProduct}
                onClose={() => setDeleteProduct(false)}
                onDelete={handleDeleteToggle}
            />
            <ModalEditProductManagement
                isOpen={editProduct}
                onClose={handleModalToggleEdit}
                onEditProduct={handleEditProducto}
                categories={categories}
                setAvailable_quantity={setAvailable_quantity}
                available_quantity={available_quantity}
                setCategory_id={setCategory_id}
                category_id={category_id}
                setPrice={setPrice}
                price={price}
                setDescription={setDescription}
                description={description}
                setTitle={setTitle}
                title={title}
                setImage={setImage}
                image={image}
                providers={providers}
                currentProduct={currentProduct}
                fetchProductos={fetchProductos}
                setCurrentProduct={setCurrentProduct}
                setProviders={setProviders}
                handleImageUpload={handleImageUpload}
                fetchCategories={fetchCategories}
                fetchProviders={fetchProviders}
            />
        </div>
    );
};

export default ProductManagement;
