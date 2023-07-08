import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { videoShareValidationSchema } from 'validationSchema/video-shares';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.video_share
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getVideoShareById();
    case 'PUT':
      return updateVideoShareById();
    case 'DELETE':
      return deleteVideoShareById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getVideoShareById() {
    const data = await prisma.video_share.findFirst(convertQueryToPrismaUtil(req.query, 'video_share'));
    return res.status(200).json(data);
  }

  async function updateVideoShareById() {
    await videoShareValidationSchema.validate(req.body);
    const data = await prisma.video_share.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteVideoShareById() {
    const data = await prisma.video_share.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
