import { randomUUID } from 'crypto'

import { Optional } from '@/core/types/optional'

export class Product {
  id: string
  title: string
  price: number
  quantity: number
  zipcode: string
  seller: string
  thumbnailHd: string
  date: Date
  createdAt: Date
  updatedAt?: Date | null

  private constructor(props: Product) {
    this.id = props.id
    this.title = props.title
    this.price = props.price
    this.quantity = props.quantity
    this.zipcode = props.zipcode
    this.seller = props.seller
    this.thumbnailHd = props.thumbnailHd
    this.date = props.date
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
  }

  static create(props: Optional<Product, 'id' | 'createdAt'>): Product {
    const product = new Product({
      ...props,
      id: props.id ?? randomUUID(),
      createdAt: props.createdAt ?? new Date(),
    })

    return product
  }
}
