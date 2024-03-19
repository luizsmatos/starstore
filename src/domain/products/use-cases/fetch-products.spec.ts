import { makeProduct } from 'tests/factories/make-product'
import { InMemoryProductsRepository } from 'tests/repositories/in-memory-products-repository'

import { FetchProductsUseCase } from './fetch-products'

let sut: FetchProductsUseCase
let inMemoryProductsRepository: InMemoryProductsRepository

describe('Fetch Products UseCase', () => {
  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()
    sut = new FetchProductsUseCase(inMemoryProductsRepository)
  })

  it('should be able to fetch products', async () => {
    for (let index = 0; index < 5; index += 1) {
      await inMemoryProductsRepository.create(makeProduct({ id: `product-${index}` }))
    }

    const result = await sut.execute()

    expect(result.products).toHaveLength(5)
  })
})
