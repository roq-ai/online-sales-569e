import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { customerReplyValidationSchema } from 'validationSchema/customer-replies';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.customer_reply
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getCustomerReplyById();
    case 'PUT':
      return updateCustomerReplyById();
    case 'DELETE':
      return deleteCustomerReplyById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCustomerReplyById() {
    const data = await prisma.customer_reply.findFirst(convertQueryToPrismaUtil(req.query, 'customer_reply'));
    return res.status(200).json(data);
  }

  async function updateCustomerReplyById() {
    await customerReplyValidationSchema.validate(req.body);
    const data = await prisma.customer_reply.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteCustomerReplyById() {
    const data = await prisma.customer_reply.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
