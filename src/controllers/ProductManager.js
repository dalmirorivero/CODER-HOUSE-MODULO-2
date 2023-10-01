import Product from '../dao/models/product.js';

const productManager = {
// CREATE 
createProduct: async (req, res) => {
    try {
        const productData = req.body;
        const newProduct = await Product.create(productData);
        res.json({ status: 'success', product: newProduct });
    } catch (error) {
        res.status(400).json({ status: 'error', message: 'Error creating product' });
    }
},
newProduct: async (req, res) => {
    res.render('newproductform')
},
// READ
getProducts: async (req, res) => {
    try {
        const products = await Product.find().lean();
        res.render('index', { products });
    } catch (error) {
        res.status(500).json({ message: 'Error getting the products.' });
    }
},
getProductsById: async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId).lean();
        if (product) {
            res.render('productdetail', { product }); 
        } else {
            res.status(404).json({ status: 'error', message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error getting product details' });
    }
},
// UPDATE
updateProduct: async (req, res) => {
    try {
        const pid = req.params.id;
        const updatedFields = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(pid, updatedFields, { new: true });
    if (!updatedProduct) {
        res.status(404).json({ status: 'error', message: 'Product not found' });
    } else {
        res.json({ status: 'success', product: updatedProduct });
    }
    } catch (error) {
        res.status(400).json({ status: 'error', message: 'Error updating product' });
    }
},
// DELETE
deleteProduct: async (req, res) => {
    try {
        const pid = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(pid);      
    if (!deletedProduct) {
        res.status(404).json({ status: 'error', message: 'Product not found' });
    } else {
        res.json({ status: 'success', message: 'Product deleted' });
    }
    } catch (error) {
        res.status(400).json({ status: 'error', message: 'Error deleting product' });
    }
}
};

export default productManager;