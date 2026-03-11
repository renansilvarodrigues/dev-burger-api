import * as Yup from 'yup';
import Product from '../models/Product.js';

class CategoryController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response
        .status(400)
        .json({ error: 'Validation failed', details: err.errors });
    }

    const { name } = request.body;

    const newCategory = await Category.create({
      name,
      price,
      category,
      image: filename,
    });

    return response.status(201).json({newCategory});
  }

  async index(_request, response) {
    const categories = await Category.findAll();
    return response.status(200).json(categories);
  }
}
export default new CategoryController();
