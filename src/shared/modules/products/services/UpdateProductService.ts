import AppError from '@shared/http/errors/AppErrors';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
  name: string;
  price: number;
  amount: number;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    amount,
  }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    const productExists = await productsRepository.findByName(name);
    console.log(productExists, name, product.name);
    if (productExists && name !== product.name) {
      throw new AppError('Product already exists.');
    }

    product.name = name;
    product.price = price;
    product.amount = amount;

    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
