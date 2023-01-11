import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/http/errors/AppErrors';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  name: string;
  price: number;
  amount: number;
}

class CreateProductService {
  public async execute({ name, price, amount }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const productExists = await productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('Product already exists.');
    }

    const redisCache = new RedisCache();

    const product = productsRepository.create({
      name,
      price,
      amount,
    });

    await redisCache.invalidate('api-vendas-PRODUCTS_LIST')

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
