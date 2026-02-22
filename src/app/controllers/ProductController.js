import * as Yup from 'yup';

class ProductController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category: Yup.string().required(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false, strict: true });
    } catch (err) {
      return response
        .status(400)
        .json({ error: 'Validation failed', details: err.errors });
    }

    return res.json({ message: 'ok' });
  }
}
export default new ProductController();
