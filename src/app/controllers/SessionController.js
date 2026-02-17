import * as Yup from 'yup';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

class SessionController {
  async store(req, response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    const isValid = await schema.isValid(req.body, { strict: true });

    const emailOrPasswordIncorrect = () =>
      response.status(400).json({ error: 'email or password is invalid' });

    if (!isValid) {
      return emailOrPasswordIncorrect();
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser) {
      return emailOrPasswordIncorrect();
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password_hash,
    );

    if (!isPasswordCorrect) {
      return emailOrPasswordIncorrect();
    }

    return response.status(200).json({
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      admin: existingUser.admin,
    });
  }
}

export default new SessionController();
