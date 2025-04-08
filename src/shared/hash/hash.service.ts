import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as argon2 from 'argon2';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  async hashBcrypt(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, 10);
    } catch (error) {
      throw new InternalServerErrorException('Error hashing password');
    }
  }
  async hash(password: string): Promise<string> {
    try {
      return await argon2.hash(password);
    } catch (error) {
      throw new InternalServerErrorException('Error hashing password');
    }
  }

  async compareBcryptHash(password: string, hash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hash);
    } catch (error) {
      throw new InternalServerErrorException('Error verifying password');
    }
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    try {
      return await argon2.verify(hash, password);
    } catch (error) {
      throw new InternalServerErrorException('Error verifying password');
    }
  }
}
