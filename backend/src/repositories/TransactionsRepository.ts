import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface AllTransactions {
  transactions: Transaction[];
  balance: Balance;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getTransactions(): Promise<AllTransactions> {
    const balance = await this.getBalance();
    const transactions = await this.find({ relations: ['category'] });

    const allTransactions = {
      transactions,
      balance,
    };

    return allTransactions;
  }

  public async getBalance(): Promise<Balance> {
    const outcomes: number[] = [];
    const incomes: number[] = [];

    const transactions = await this.find();

    await transactions.map(trans => {
      return trans.type === 'income'
        ? incomes.push(trans.value)
        : outcomes.push(trans.value);
    });

    const income = incomes.reduce((sum, value) => sum + value, 0);
    const outcome = outcomes.reduce((sum, value) => sum + value, 0);

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }
}

export default TransactionsRepository;
