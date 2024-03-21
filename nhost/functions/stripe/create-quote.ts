import { Request, Response } from 'express';
import { sendMail } from '../_utils/mailjet';
import { getLineItem, stripe } from '../_utils/stripe';

function getContent(body: Record<string, string>): string {
  return Object.entries(body)
    .map(([key, value]) => `${key}:\n${value}`)
    .join('\n\n');
}

const createQuote = async (req: Request, res: Response) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Method Not Allowed' });
  }

  const { email, plan, name } = req.body;

  if (!email || !plan || !name) {
    return res.status(405).send({ message: 'Bad Request.' });
  }

  const customer = await stripe.customers.create({ email, name });
  const lineItem = await getLineItem({ plan, quantity: 1, interval: 'year' });

  if (!customer || !lineItem) {
    return res.status(405).send({ message: 'Bad Request.' });
  }

  const quote = await stripe.quotes.create({ customer: customer.id, line_items: [lineItem] });
  const finalizedQuote = await stripe.quotes.finalizeQuote(quote.id);

  if (!quote || !finalizedQuote) {
    return res.status(405).send({ message: 'Bad Request.' });
  }

  const quotePdf = await stripe.quotes.pdf(quote.id);

  console.log(quotePdf);

  // const content = getContent(req.body);

  // const success = await sendMail({
  //   to: 'info@xyflow.com',
  //   subject: 'Your React Flow Pro Quote Request',
  //   content,
  //   replyTo: req.body.email,
  // });

  // if (!success) {
  //   return res.status(500).json({ message: 'something went wrong.' });
  // }

  return res.status(200).json({ message: 'ok', quote });
};

export default createQuote;
