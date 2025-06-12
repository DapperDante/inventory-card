import bcrypt from 'bcryptjs';
import { appEnv } from '../config/env.config';


export const hashPassword = async (password: string) => {
  const saltRounds = await bcrypt.genSalt(appEnv.BCRYPT_SALT_ROUNDS);
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

export const verifyPassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
}