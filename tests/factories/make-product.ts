import { Product } from '@/domain/products/entities/product'

export function makeProduct(override: Partial<Product> = {}): Product {
  return Product.create({
    title: 'any_title',
    price: 10,
    quantity: 1,
    zipcode: 'any_zipcode',
    seller: 'any_seller',
    thumbnailHd: 'any_thumbnailHd',
    date: new Date('26/11/2015'),
    ...override,
  })
}
