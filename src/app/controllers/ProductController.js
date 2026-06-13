import * as Yup from 'yup';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

class ProductController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category_id: Yup.number().required(),
      offer: Yup.boolean(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response
        .status(400)
        .json({ error: 'Validation failed', details: err.errors });
    }

    const { name, price, category_id, offer = false } = request.body;
    const path = request.file ? request.file.filename : null;

    await Product.update({
      name,
      price,
      category_id,
      path,
      offer,
    });

    return response.status(200).json();
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      price: Yup.number(),
      category_id: Yup.number(),
      offer: Yup.boolean(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response
        .status(400)
        .json({ error: 'Validation failed', details: err.errors });
    }

    const { id } = request.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return response.status(404).json({ error: 'Product not found' });
    }

    const { name, price, category_id, offer } = request.body;
    const path = request.file ? request.file.filename : product.path;

    await product.update({
      name,
      price,
      category_id,
      path,
      offer,
    });

    return response.status(200).json(product);
  }

  async index(_request, response) {
    const products = await Product.findAll({
      include: [
        { model: Category, as: 'category', attributes: ['id', 'name'] },
      ],
    });
    return response.status(200).json(products);
  }
}
export default new ProductController();
