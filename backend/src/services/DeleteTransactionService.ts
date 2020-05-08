import { getCustomRepository } from 'typeorm';
// import AppError from '../errors/AppError';
import TransactionRepository from '../repositories/TransactionsRepository';
// import CategoryRepository from '../repositories/CategoryRepository';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionRepository);
    // const categoryRepository = getRepository(CategoryRepository);

    const transactionFindById = await transactionsRepository.findOne(id);

    if (transactionFindById) {
      await transactionsRepository.remove(transactionFindById);
    }
  }
}

export default DeleteTransactionService;
