import * as Yup from 'yup';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

class OrderController {
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

    const { userId, userName } = request;
    const order = {
      user: {
        id: userId,
        name: userName,
      },
    };

    return response.status(200).json(order);
  }
}
export default new OrderController();
