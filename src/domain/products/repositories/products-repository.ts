import { Product } from '../entities/product'

export interface ProductsRepository {
  findAll(): Promise<Product[]>
  create(product: Product): Promise<void>
}
