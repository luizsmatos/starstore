import { FakerHasher } from 'tests/cryptography/faker-hasher'
import { InMemoryCustomersRepository } from 'tests/repositories/in-memory-customers-repository'

import { CreateCustomerUseCase } from './create-customer'

let sut: CreateCustomerUseCase
let inMemoryCustomersRepository: InMemoryCustomersRepository
let fakerHasher: FakerHasher

describe('Create Customer UseCase', () => {
  beforeEach(() => {
    fakerHasher = new FakerHasher()
    inMemoryCustomersRepository = new InMemoryCustomersRepository()
    sut = new CreateCustomerUseCase(inMemoryCustomersRepository, fakerHasher)
  })

  it('should be able to create a new customer', async () => {
    const result = await sut.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    })

    const hashedPassword = await fakerHasher.hash('any_password')

    expect(result).toEqual({
      customer: expect.objectContaining({
        id: expect.any(String),
      }),
    })
    expect(inMemoryCustomersRepository.items[0].password).toEqual(hashedPassword)
  })
})
