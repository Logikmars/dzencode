import { NextResponse } from 'next/server';
import { getReceiptsResponse } from '@/lib/receipts';

export async function GET() {
  const receiptsResponse = await getReceiptsResponse();

  return NextResponse.json(receiptsResponse);
}
