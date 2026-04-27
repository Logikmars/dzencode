import { NextResponse } from 'next/server';
import { deleteReceiptProduct } from '@/lib/receipts';

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const productId = Number(id);

  if (!Number.isInteger(productId) || productId <= 0) {
    return NextResponse.json({ message: 'Invalid product id.' }, { status: 400 });
  }

  try {
    const deletedProduct = await deleteReceiptProduct(productId);

    if (!deletedProduct) {
      return NextResponse.json({ message: 'Product not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, id: deletedProduct.id });
  } catch (error) {
    console.error('Failed to delete product.', error);

    if (error instanceof Error && /ECONNREFUSED|Database is not configured/i.test(error.message)) {
      return NextResponse.json(
        { message: 'Database is unavailable. Deletion is disabled while fallback data is shown.' },
        { status: 503 },
      );
    }

    return NextResponse.json({ message: 'Failed to delete product.' }, { status: 500 });
  }
}
