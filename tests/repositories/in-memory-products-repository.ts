import { Product } from '@/domain/products/entities/product'
import { ProductsRepository } from '@/domain/products/repositories/products-repository'

export class InMemoryProductsRepository implements ProductsRepository {
  public items: Product[] = []

  async findAll(): Promise<Product[]> {
    return this.items
  }

  async create(product: Product): Promise<void> {
    this.items.push(product)
  }
}
