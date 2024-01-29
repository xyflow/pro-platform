import { Request, Response } from 'express';
import { authPost } from '../_utils/middleware';
import { deleteUser } from '../_utils/graphql/users';

async function deleteUserHandler(req: Request, res: Response, { userId }: { userId: string }) {
  if (!userId) {
    return res.status(405).send({ message: 'Bad request.' });
  }

  const success = deleteUser(userId);

  return res.status(200).send({ success });
}

export default authPost(deleteUserHandler);
