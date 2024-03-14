import { randomUUID } from 'crypto'

import { Optional } from '@/core/types/optional'

export class Customer {
  id: string
  name: string
  email: string
  password: string
  createdAt: Date
  updatedAt?: Date | null

  private constructor(props: Customer) {
    this.id = props.id
    this.name = props.name
    this.email = props.email
    this.password = props.password
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
  }

  static create(props: Optional<Customer, 'id' | 'createdAt'>): Customer {
    const customer = new Customer({
      ...props,
      id: props.id ?? randomUUID(),
      createdAt: props.createdAt ?? new Date(),
    })

    return customer
  }
}
