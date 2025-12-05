import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { SALT_ROUNDS } from 'src/shared/constants';

@Injectable()
export class EncryptService {
  private salt = SALT_ROUNDS;

  async hash(plainText: string): Promise<string> {
    const hashed = await hash(plainText, this.salt);
    return hashed;
  }

  async compare(value: string, hash: string): Promise<boolean> {
    const veredict = await compare(value, hash);
    return veredict;
  }
}
