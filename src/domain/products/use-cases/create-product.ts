import { Product } from '../entities/product'
import { ProductsRepository } from '../repositories/products-repository'

interface CreateProductUseCaseRequest {
  title: string
  price: number
  quantity: number
  zipcode: string
  seller: string
  thumbnailHd: string
  date: Date
}

interface CreateProductUseCaseResponse {
  product: Product
}

export class CreateProductUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute({
    title,
    price,
    quantity,
    zipcode,
    seller,
    thumbnailHd,
    date,
  }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseResponse> {
    const product = Product.create({
      title,
      price,
      quantity,
      zipcode,
      seller,
      thumbnailHd,
      date,
    })

    await this.productsRepository.create(product)

    return {
      product,
    }
  }
}
