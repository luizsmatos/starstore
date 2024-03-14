import { Customer } from '@/domain/customers/entities/customer'
import { CustomersRepository } from '@/domain/customers/repositories/customers-repository'

export class InMemoryCustomersRepository implements CustomersRepository {
  public items: Customer[] = []

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = this.items.find((item) => item.email === email)

    return customer ?? null
  }

  async create(customer: Customer): Promise<void> {
    this.items.push(customer)
  }
}
