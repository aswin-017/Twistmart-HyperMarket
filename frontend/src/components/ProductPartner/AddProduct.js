// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useAuth } from '../contexts/AuthContext'; // Adjust the path as necessary
// import '../../assets/css/productpartner/AddProduct.css';

// const BASE_URL = 'http://localhost:5000'; // Base URL for your backend

// const AddProduct = () => {
//     const [step, setStep] = useState(1);
//     const [productDetails, setProductDetails] = useState({
//         product_name: '',
//         product_description: '',
//         product_image: '', // Store as a string
//         base_price: '',
//         stock_quantity: '',
//     });

//     const [categoryDetails, setCategoryDetails] = useState({
//         category_name: '',
//         category_description: '',
//     });

//     const { userId } = useAuth(); // Assuming userId is the owner_id
//     const navigate = useNavigate();

//     const handleNextStep = (e) => {
//         e.preventDefault();
//         setStep(step + 1);
//     };

//     const handlePrevStep = () => {
//         setStep(step - 1);
//     };

//     const handleProductChange = (e) => {
//         const { name, value } = e.target;
//         setProductDetails({ ...productDetails, [name]: value });
//     };

//     const handleProductImageChange = (e) => {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//             setProductDetails({ ...productDetails, product_image: reader.result });
//         };
//         if (e.target.files[0]) {
//             reader.readAsDataURL(e.target.files[0]);
//         }
//     };

//     const handleCategoryChange = (e) => {
//         const { name, value } = e.target;
//         setCategoryDetails({ ...categoryDetails, [name]: value });
//     };
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             // Step 1: Retrieve shop_id
//             const { data: shopData } = await axios.get(`${BASE_URL}/api/shops_/${userId}`);
//             const shop_id = shopData.shop_id;
    
//             // Create request body
//             const requestBody = {
//                 product_name: productDetails.product_name,
//                 product_description: productDetails.product_description,
//                 product_image: null, // Pass image as a string
//                 base_price: productDetails.base_price,
//                 stock_quantity: productDetails.stock_quantity,
//                 shop_id: shop_id,
//             };
    
//             // Step 2: Add new product
//             const { data: productData } = await axios.post(`${BASE_URL}/api/products_`, requestBody);
//         const product_id = productData.product_id;

//         // Add new category
//         const { data: categoryData } = await axios.post(`${BASE_URL}/api/categories_`, {
//             category_name: categoryDetails.category_name,
//             category_description: categoryDetails.category_description,
//             parent_category_id: null, // Adjust if necessary
//         });
//         const category_id = categoryData.category_id;

//         // Link product to category
//         await axios.post(`${BASE_URL}/api/productcategories_`, {
//             product_id,
//             category_id,
//         });

//         navigate('/product_partner/product-details');
//     } catch (error) {
//         console.error('Error adding product and category:', error);
//         alert('Failed to add product. Please try again.');
//     }
// };
//     return (
//         <div className="add-product-container">
//             {step === 1 && (
//                 <form className="product-form" onSubmit={handleNextStep}>
//                     <h2>Step 1: Product Details</h2>
//                     <label>Product Name:</label>
//                     <input
//                         type="text"
//                         name="product_name"
//                         value={productDetails.product_name}
//                         onChange={handleProductChange}
//                         required
//                     />

//                     <label>Product Description:</label>
//                     <textarea
//                         name="product_description"
//                         value={productDetails.product_description}
//                         onChange={handleProductChange}
//                     ></textarea>

//                     <label>Product Image:</label>
//                     <input
//                         type="file"
//                         name="product_image"
//                         onChange={handleProductImageChange}
//                     />

//                     <label>Base Price:</label>
//                     <input
//                         type="number"
//                         name="base_price"
//                         value={productDetails.base_price}
//                         onChange={handleProductChange}
//                         required
//                     />

//                     <label>Stock Quantity:</label>
//                     <input
//                         type="number"
//                         name="stock_quantity"
//                         value={productDetails.stock_quantity}
//                         onChange={handleProductChange}
//                         required
//                     />

//                     <button type="submit" className="save-next-button">Save & Next</button>
//                 </form>
//             )}
//             {step === 2 && (
//                 <form className="category-form" onSubmit={handleSubmit}>
//                     <h2>Step 2: Category Details</h2>
//                     <label>Category Name:</label>
//                     <select
//                         name="category_name"
//                         value={categoryDetails.category_name}
//                         onChange={handleCategoryChange}
//                         required
//                     >
//                         <option value="">Select Category</option>
//                         <option value="Fruits & Vegetables">Fruits & Vegetables</option>
//                         <option value="Food Grains, Oil & Masala">Food Grains, Oil & Masala</option>
//                         <option value="Beauty & Hygiene">Beauty & Hygiene</option>
//                         <option value="Appliances & Furnitures">Appliances & Furnitures</option>
//                         <option value="Snacks & Beverages">Snacks & Beverages</option>
//                     </select>

//                     <label>Category Description:</label>
//                     <textarea
//                         name="category_description"
//                         value={categoryDetails.category_description}
//                         onChange={handleCategoryChange}
//                     ></textarea>

//                     <div className="form-navigation">
//                         <button type="button" className="back-button" onClick={handlePrevStep}>Back</button>
//                         <button type="submit" className="add-product-button">Add Product</button>
//                     </div>
//                 </form>
//             )}
//         </div>
//     );
// };

// export default AddProduct;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext'; // Adjust the path as necessary
import '../../assets/css/productpartner/AddProduct.css';

const BASE_URL = 'http://localhost:5000'; // Base URL for your backend

const AddProduct = () => {
    const [step, setStep] = useState(1);
    const [productDetails, setProductDetails] = useState({
        product_name: '',
        product_description: '',
        product_image: '', // Store as a Base64 string
        base_price: '',
        stock_quantity: '',
    });

    const [categoryDetails, setCategoryDetails] = useState({
        category_name: '',
        category_description: '',
    });

    const { userId } = useAuth(); // Assuming userId is the owner_id
    const navigate = useNavigate();

    const handleNextStep = (e) => {
        e.preventDefault();
        setStep(step + 1);
        
    };

    const handlePrevStep = () => {
      setStep(step - 1);
    };

    const handleProductChange = (e) => {
        const { name, value } = e.target;
        setProductDetails({ ...productDetails, [name]: value });
    };

    const handleProductImageChange = async (e) => {
        try {
            const file = e.target.files[0];
            if (file) {
                const base64Image = await base64Encode(file);
                setProductDetails({ ...productDetails, product_image: base64Image });
            }
        } catch (error) {
            console.error('Error encoding image:', error);
        }
    };

    const handleCategoryChange = (e) => {
        const { name, value } = e.target;
        setCategoryDetails({ ...categoryDetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Step 1: Retrieve shop_id
            const { data: shopData } = await axios.get(`${BASE_URL}/api/shops_/${userId}`);
            const shop_id = shopData.shop_id;
            console.log('Shop ID:', shop_id);

            // Create request body
            const requestBody = {
                product_name: productDetails.product_name,
                product_description: productDetails.product_description,
                product_image: productDetails.product_image,
                base_price: productDetails.base_price,
                stock_quantity: productDetails.stock_quantity,
                shop_id: shop_id,
            };

            // Step 2: Add new product
            const { data: productData } = await axios.post(`${BASE_URL}/api/products_`, requestBody);
            const product_id = productData.product_id;
            console.log('Product ID:', product_id);

            // Add new category
            const { data: categoryData } = await axios.post(`${BASE_URL}/api/categories_`, {
                category_name: categoryDetails.category_name,
                category_description: categoryDetails.category_description,
                parent_category_id: null, // Adjust if necessary
            });
            const category_id = categoryData.category_id;
            console.log('Category ID:', category_id);

            // Link product to category
            await axios.post(`${BASE_URL}/api/productcategories_`, {
                product_id,
                category_id,
            });

            navigate('/product_partner/product-details');
        } catch (error) {
            console.error('Error adding product and category:', error);
            alert('Failed to add product. Please try again.');
        }
    };

    const base64Encode = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    return (
        <div className="add-product-container">
            {step === 1 && (
                <form className="product-form" onSubmit={handleNextStep}>
                    <h2>Step 1: Product Details</h2>
                    <label>Product Name:</label>
                    <input
                        type="text"
                        name="product_name"
                        value={productDetails.product_name}
                        onChange={handleProductChange}
                        required
                    />

                    <label>Product Description:</label>
                    <textarea
                        name="product_description"
                        value={productDetails.product_description}
                        onChange={handleProductChange}
                    ></textarea>

                    <label>Product Image:</label>
                    <input
                        type="file"
                        name="product_image"
                        onChange={handleProductImageChange}
                    />

                    <label>Base Price:</label>
                    <input
                        type="number"
                        name="base_price"
                        value={productDetails.base_price}
                        onChange={handleProductChange}
                        required
                    />

                    <label>Stock Quantity:</label>
                    <input
                        type="number"
                        name="stock_quantity"
                        value={productDetails.stock_quantity}
                        onChange={handleProductChange}
                        required
                    />

                    <button type="submit" className="save-next-button">Save & Next</button>
                </form>
            )}
            {step === 2 && (
                <form className="category-form" onSubmit={handleSubmit}>
                    <h2>Step 2: Category Details</h2>
                    <label>Category Name:</label>
                    <select
                        name="category_name"
                        value={categoryDetails.category_name}
                        onChange={handleCategoryChange}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Fruits & Vegetables">Fruits & Vegetables</option>
                        <option value="Food Grains, Oil & Masala">Food Grains, Oil & Masala</option>
                        <option value="Beauty & Hygiene">Beauty & Hygiene</option>
                        <option value="Appliances & Furnitures">Appliances & Furnitures</option>
                        <option value="Snacks & Beverages">Snacks & Beverages</option>
                    </select>

                    <label>Category Description:</label>
                    <textarea
                        name="category_description"
                        value={categoryDetails.category_description}
                        onChange={handleCategoryChange}
                    ></textarea>

                    <div className="form-navigation">
                        <button type="button" className="back-button" onClick={handlePrevStep}>Back</button>
                        <button type="submit" className="add-product-button">Add Product</button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default AddProduct;
