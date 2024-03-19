import { Product } from '../entities/product'
import { ProductsRepository } from '../repositories/products-repository'

interface FetchProductsUseCaseResponse {
  products: Product[]
}

export class FetchProductsUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(): Promise<FetchProductsUseCaseResponse> {
    const products = await this.productsRepository.findAll()

    return {
      products,
    }
  }
}
