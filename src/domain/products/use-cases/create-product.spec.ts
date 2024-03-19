import { InMemoryProductsRepository } from 'tests/repositories/in-memory-products-repository'

import { CreateProductUseCase } from './create-product'

let sut: CreateProductUseCase
let inMemoryProductsRepository: InMemoryProductsRepository

describe('Create Customer UseCase', () => {
  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()
    sut = new CreateProductUseCase(inMemoryProductsRepository)
  })

  it('should be able to create a new customer', async () => {
    const result = await sut.execute({
      title: 'any_title',
      price: 10,
      quantity: 10,
      zipcode: 'any_zipcode',
      seller: 'any_seller',
      thumbnailHd: 'any_thumbnailHd',
      date: new Date('26/11/2015'),
    })

    expect(result).toEqual({
      product: expect.objectContaining({
        id: expect.any(String),
      }),
    })
  })
})
