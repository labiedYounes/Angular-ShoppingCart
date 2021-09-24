import { Category } from "./category";

export class Product {
  id: number;
  name: string;
  categoryId: number;
  userId: number;
  price: number;
  description: string;
  imgs: string;
  quantity: number;
  category: Category;
}
