import crypto from 'node:crypto'

import { env } from '@/infra/config/env'

import { HashComparer } from '../hash-comparer'
import { HashGenerator } from '../hash-generator'

export class CryptoHasher implements HashGenerator, HashComparer {
  async compare(plain: string, hash: string): Promise<boolean> {
    const hashed = await this.hash(plain)

    return hashed === hash
  }

  async hash(plain: string) {
    const hash = crypto.createHmac('sha256', env.SALT).update(plain)

    return hash.digest('hex')
  }
}
