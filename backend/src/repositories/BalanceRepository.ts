import { getCustomRepository } from 'typeorm';
import TransactionsRepository from './TransactionsRepository';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class CreateBalanceRepository {
  public async execute(): Promise<Balance> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    return transactionsRepository.getBalance();
  }
}

export default CreateBalanceRepository;
