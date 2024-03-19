import { Encrypter } from '@/infra/cryptography/encrypter'
import { HashComparer } from '@/infra/cryptography/hash-comparer'

import { CustomersRepository } from '../repositories/customers-repository'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

interface AuthenticateCustomerUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateCustomerUseCaseResponse {
  accessToken: string
}

export class AuthenticateCustomerUseCase {
  constructor(
    private readonly customersRepository: CustomersRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateCustomerUseCaseRequest): Promise<AuthenticateCustomerUseCaseResponse> {
    const customer = await this.customersRepository.findByEmail(email)

    if (!customer) {
      throw new WrongCredentialsError()
    }

    const isPasswordValid = await this.hashComparer.compare(password, customer.password)

    if (!isPasswordValid) {
      throw new WrongCredentialsError()
    }

    const accessToken = await this.encrypter.encrypt({ sub: customer.id })

    return {
      accessToken,
    }
  }
}
