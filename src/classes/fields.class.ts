import { z } from 'zod';

export class UserFields{
  static signup = z.object({
    username: z.string().min(10, "Username must be at least 10 characters long"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    email: z.string().email("Invalid email format"),
  })
  static login = z.object({
    username: z.string().min(10, "Username must be at least 10 characters long"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
  })
}

export class CompanyFields{
  static create = z.object({
    name: z.string().min(3, "Company name must be at least 3 characters long")
  })
}

export class ProductFields{
  static create = z.object({
    name: z.string().min(3, "Product name must be at least 3 characters long"),
    description: z.string().min(10, "Description must be at least 10 characters long"),
  })
}

export class CardFields{
  static create = z.object({
    inventory_method_id: z.number().min(1, "Inventory method ID must be a positive integer"),
    currency_id: z.number().min(1, "Currency ID must be a positive integer"),
    name: z.string().min(3, "Card name must be at least 3 characters long"),
    description: z.string().min(10, "Description must be at least 10 characters long"),
    date: z.date()
  })
}

export class MovementFields{
  static entry = z.object({
    quantity: z.number().min(1, "Quantity must be a positive number"),
    unit_cost: z.number().min(0, "Unit cost must be a non-negative number"),
  })
  static exit = z.object({
    quantity: z.number().min(1, "Quantity must be a positive number"),
  })
}