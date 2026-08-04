import * as Yup from 'yup';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
class OrderController {
  async store(request, response) {
    const schema = Yup.object({
      products: Yup.array().required().of(
          Yup.object({
            product_id: Yup.number().required(),
            quantity: Yup.number().required(),
          })
        )
    });

    try {
      schema.validateSync(request.body, { abortEarly: false, strict: true });
    } catch (err) {
      return response
        .status(400)
        .json({ error: 'Validation failed', details: err.errors });
    }

    const { userId, userName } = request;
    const { products } = request.body;

    const productIds = products.map(product => product.id);

    const foundProducts = await Product.findAll({
      where: {
        id: productIds,
      },
      include: {
        model: Category,
        as: 'category',
        attributes: ['name'],
      },
    });

    const mappedProducts = foundProducts.map(product => {
     const quantity = products.find(p => p.id === product.id).quantity;
      const newProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      url: product.url,
      category: product.category.name,
      quantity,
    };
    return newProduct;
  });

    const order = {
      user: {
        id: userId,
        name: userName,
      },
      products: mappedProducts,
      status: 'pedido realizado',
    };

const newOrder = await Order.create(order)

    return response.status(200).json(newOrder);
  }
}
export default new OrderController();
