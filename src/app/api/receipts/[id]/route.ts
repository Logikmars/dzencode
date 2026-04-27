import { NextResponse } from 'next/server';
import { deleteReceipt } from '@/lib/receipts';

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const receiptId = Number(id);

  if (!Number.isInteger(receiptId) || receiptId <= 0) {
    return NextResponse.json({ message: 'Invalid receipt id.' }, { status: 400 });
  }

  try {
    const deletedReceipt = await deleteReceipt(receiptId);

    if (!deletedReceipt) {
      return NextResponse.json({ message: 'Receipt not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, id: deletedReceipt.id });
  } catch (error) {
    console.error('Failed to delete receipt.', error);

    if (error instanceof Error && /ECONNREFUSED|Database is not configured/i.test(error.message)) {
      return NextResponse.json(
        { message: 'Database is unavailable. Deletion is disabled while fallback data is shown.' },
        { status: 503 },
      );
    }

    return NextResponse.json({ message: 'Failed to delete receipt.' }, { status: 500 });
  }
}
