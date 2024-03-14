import { HashGenerator } from '@/infra/cryptography/hash-generator'

export class FakerHasher implements HashGenerator {
  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed')
  }
}
