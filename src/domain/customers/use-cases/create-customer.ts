import { HashGenerator } from '@/infra/cryptography/hash-generator'

import { Customer } from '../entities/customer'
import { CustomersRepository } from '../repositories/customers-repository'
import { CustomerAlreadyExistsError } from './errors/customer-already-exists-error'

interface CreateCustomerUseCaseRequest {
  name: string
  email: string
  password: string
}

interface CreateCustomerUseCaseResponse {
  customer: Customer
}

export class CreateCustomerUseCase {
  constructor(
    private readonly customersRepository: CustomersRepository,
    private readonly hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: CreateCustomerUseCaseRequest): Promise<CreateCustomerUseCaseResponse> {
    const customerWithSameEmail = await this.customersRepository.findByEmail(email)

    if (customerWithSameEmail) {
      throw new CustomerAlreadyExistsError(email)
    }

    const passwordHash = await this.hashGenerator.hash(password)

    const customer = Customer.create({
      name,
      email,
      password: passwordHash,
    })

    await this.customersRepository.create(customer)

    return {
      customer,
    }
  }
}
