import { Router } from 'express';

import { getCustomRepository } from 'typeorm';
import multer from 'multer';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';
import uploadConfig from '../config/upload';

const transactionsRouter = Router();
const upload = multer(uploadConfig);

transactionsRouter.get('/', async (request, response) => {
  const transactionRepository = await getCustomRepository(
    TransactionsRepository,
  );

  const transactions = await transactionRepository.getTransactions();

  return response.json(transactions);
});

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category } = request.body;
  const createAppointment = new CreateTransactionService();

  const transaction = await createAppointment.execute({
    title,
    value,
    type,
    category,
  });

  delete transaction.category_id;

  return response.json(transaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const createAppointment = new DeleteTransactionService();

  await createAppointment.execute({
    id,
  });

  return response.status(204).send();
});

transactionsRouter.post(
  '/import',
  upload.single('file'),
  async (request, response) => {
    const importTransactionService = new ImportTransactionsService();
    const users = await importTransactionService.execute({
      fileName: request.file.filename,
    });

    return response.status(200).json(users);
  },
);

export default transactionsRouter;
