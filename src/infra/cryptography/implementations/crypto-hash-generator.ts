import crypto from 'node:crypto'

import { env } from '@/infra/config/env'

import { HashGenerator } from '../hash-generator'

export class CryptoHashGenerator implements HashGenerator {
  async hash(plain: string) {
    const hash = crypto.createHmac('sha256', env.SALT).update(plain)

    return hash.digest('hex')
  }
}
