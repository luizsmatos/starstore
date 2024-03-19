import { FakerEncrypter } from 'tests/cryptography/faker-encrypter'
import { FakerHasher } from 'tests/cryptography/faker-hasher'
import { makeCustomer } from 'tests/factories/make-customer'
import { InMemoryCustomersRepository } from 'tests/repositories/in-memory-customers-repository'

import { AuthenticateCustomerUseCase } from './authenticate-customer'

let sut: AuthenticateCustomerUseCase
let inMemoryCustomersRepository: InMemoryCustomersRepository
let fakerHasher: FakerHasher
let fakerEncrypter: FakerEncrypter

describe('Authenticate Customer UseCase', () => {
  beforeEach(() => {
    inMemoryCustomersRepository = new InMemoryCustomersRepository()
    fakerHasher = new FakerHasher()
    fakerEncrypter = new FakerEncrypter()

    sut = new AuthenticateCustomerUseCase(
      inMemoryCustomersRepository,
      fakerHasher,
      fakerEncrypter,
    )
  })

  it('should be able to authenticate a customer', async () => {
    const customer = makeCustomer({
      email: 'nectiz@maphi.nu',
      password: await fakerHasher.hash('123456'),
    })

    await inMemoryCustomersRepository.create(customer)

    const result = await sut.execute({
      email: 'nectiz@maphi.nu',
      password: '123456',
    })

    expect(result).toEqual({
      accessToken: expect.any(String),
    })
  })
})
