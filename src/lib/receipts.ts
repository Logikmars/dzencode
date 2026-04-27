import { hasDatabaseConnection, query } from '@/lib/db';

export type ReceiptProduct = {
  id: number;
  title: string;
  serialNum: string;
  specification: string;
  status: string;
  receiptDate: string;
  guarantee: string;
  priceTop: string;
  priceBottom: string;
  group: string;
  seller: string;
  owner: string;
  arrivalDate: string;
};

export type Receipt = {
  id: number;
  title: string;
  count: string;
  label: string;
  month: string;
  date: string;
  amountTop: string;
  amountBottom?: string;
  products: ReceiptProduct[];
};

export type ReceiptsResponse = {
  receipts: Receipt[];
  source: 'database' | 'fallback';
};

type ReceiptRow = {
  id: number;
  title: string;
  receipt_date: string;
  amount_usd: string | null;
  amount_uah: string | null;
};

type ProductRow = {
  id: number;
  receipt_id: number;
  title: string;
  serial_number: string;
  specification: string;
  status: string;
  receipt_date: string;
  guarantee_until: string;
  price_usd: string | null;
  price_uah: string | null;
  group_name: string | null;
  seller: string | null;
  owner: string | null;
  arrival_date: string;
};

const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const fallbackReceipts: Receipt[] = [
  {
    id: 1,
    title: 'Server equipment supply',
    count: '4',
    label: 'Products',
    month: '04 / 12',
    date: '06 / Apr / 2017',
    amountTop: '2 500 $',
    amountBottom: '250 000.50 UAH',
    products: [
      {
        id: 1,
        title: 'Gigabyte Technology X58-USB3 (Socket 1366) 6xUSB3',
        serialNum: 'SN-12-3456789',
        specification: 'Moni 1',
        status: 'Available',
        receiptDate: '06 / 04 / 2017',
        guarantee: '06 / 08 / 2025',
        priceTop: '250 $',
        priceBottom: '250 000.50 UAH',
        group: 'Motherboards',
        seller: '-',
        owner: 'Server equipment supply',
        arrivalDate: '06 / 12 / 2017',
      },
      {
        id: 2,
        title: 'Gigabyte Technology X58-USB3 (Socket 1366) 6xUSB3',
        serialNum: 'SN-12-3456790',
        specification: 'Moni 1',
        status: 'In repair',
        receiptDate: '06 / 04 / 2017',
        guarantee: '06 / 08 / 2025',
        priceTop: '250 $',
        priceBottom: '250 000.50 UAH',
        group: 'Motherboards',
        seller: '-',
        owner: 'Server equipment supply',
        arrivalDate: '06 / 12 / 2017',
      },
      {
        id: 3,
        title: 'Gigabyte Technology X58-USB3 (Socket 1366) 6xUSB3',
        serialNum: 'SN-12-3456791',
        specification: 'Server 2',
        status: 'Available',
        receiptDate: '06 / 04 / 2017',
        guarantee: '06 / 08 / 2025',
        priceTop: '250 $',
        priceBottom: '250 000.50 UAH',
        group: '-',
        seller: 'Server group supplier',
        owner: 'Server equipment supply',
        arrivalDate: '06 / 12 / 2017',
      },
      {
        id: 4,
        title: 'Gigabyte Technology X58-USB3 (Socket 1366) 6xUSB3',
        serialNum: 'SN-12-3456792',
        specification: 'Accessory X',
        status: 'In repair',
        receiptDate: '06 / 04 / 2017',
        guarantee: '06 / 08 / 2025',
        priceTop: '250 $',
        priceBottom: '250 000.50 UAH',
        group: 'Motherboards',
        seller: '-',
        owner: 'Server equipment supply',
        arrivalDate: '06 / 12 / 2017',
      },
    ],
  },
  {
    id: 2,
    title: 'Network equipment supply',
    count: '0',
    label: 'Products',
    month: '09 / 12',
    date: '06 / Sep / 2017',
    amountTop: '50 UAH',
    products: [],
  },
  {
    id: 3,
    title: 'Accessories supply',
    count: '0',
    label: 'Products',
    month: '06 / 12',
    date: '06 / Jun / 2017',
    amountTop: '2 500.85 $',
    amountBottom: '50.25 UAH',
    products: [],
  },
  {
    id: 4,
    title: 'Peripherals supply',
    count: '0',
    label: 'Products',
    month: '02 / 12',
    date: '06 / Feb / 2017',
    amountTop: '50.25 UAH',
    products: [],
  },
];

const fallbackReceiptOrder = new Map<number, number>([
  [4, 0],
  [1, 1],
  [3, 2],
  [2, 3],
]);

fallbackReceipts.sort((left, right) => {
  const leftOrder = fallbackReceiptOrder.get(left.id) ?? Number.MAX_SAFE_INTEGER;
  const rightOrder = fallbackReceiptOrder.get(right.id) ?? Number.MAX_SAFE_INTEGER;

  return leftOrder - rightOrder;
});

function formatDayMonth(dateValue: string) {
  const date = new Date(dateValue);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();

  return `${day} / ${month} / ${year}`;
}

function formatReceiptDate(dateValue: string) {
  const date = new Date(dateValue);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = monthLabels[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${day} / ${month} / ${year}`;
}

function formatMonthBadge(dateValue: string) {
  const date = new Date(dateValue);
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');

  return `${month} / 12`;
}

function formatCurrencyAmount(value: string | null, currency: 'USD' | 'UAH') {
  if (!value) {
    return null;
  }

  const amount = Number(value);
  const formatted = Number.isInteger(amount) ? amount.toString() : amount.toFixed(2);

  return currency === 'USD' ? `${formatted} $` : `${formatted} UAH`;
}

function pluralizeProductLabel(count: number) {
  if (count === 1) {
    return 'Product';
  }

  return 'Products';
}

function mapProductRow(row: ProductRow, receiptTitle: string): ReceiptProduct {
  return {
    id: row.id,
    title: row.title,
    serialNum: row.serial_number,
    specification: row.specification,
    status: row.status,
    receiptDate: formatDayMonth(row.receipt_date),
    guarantee: formatDayMonth(row.guarantee_until),
    priceTop: formatCurrencyAmount(row.price_usd, 'USD') ?? '-',
    priceBottom: formatCurrencyAmount(row.price_uah, 'UAH') ?? '-',
    group: row.group_name ?? '-',
    seller: row.seller ?? '-',
    owner: row.owner ?? receiptTitle,
    arrivalDate: formatDayMonth(row.arrival_date),
  };
}

export async function getReceipts(): Promise<Receipt[]> {
  const result = await getReceiptsResponse();

  return result.receipts;
}

export async function getReceiptsResponse(): Promise<ReceiptsResponse> {
  if (!hasDatabaseConnection()) {
    return {
      receipts: fallbackReceipts,
      source: 'fallback',
    };
  }

  try {
    const [receiptResult, productResult] = await Promise.all([
      query<ReceiptRow>(
        `
          select id, title, receipt_date, amount_usd, amount_uah
          from receipts
          order by receipt_date asc, id asc
        `,
      ),
      query<ProductRow>(
        `
          select
            id,
            receipt_id,
            title,
            serial_number,
            specification,
            status,
            receipt_date,
            guarantee_until,
            price_usd,
            price_uah,
            group_name,
            seller,
            owner,
            arrival_date
          from receipt_products
          order by receipt_id desc, id asc
        `,
      ),
    ]);

    const productsByReceiptId = new Map<number, ProductRow[]>();

    for (const product of productResult.rows) {
      const products = productsByReceiptId.get(product.receipt_id) ?? [];
      products.push(product);
      productsByReceiptId.set(product.receipt_id, products);
    }

    return {
      receipts: receiptResult.rows.map((receipt) => {
        const products = productsByReceiptId.get(receipt.id) ?? [];
        const count = products.length;

        return {
          id: receipt.id,
          title: receipt.title,
          count: String(count),
          label: pluralizeProductLabel(count),
          month: formatMonthBadge(receipt.receipt_date),
          date: formatReceiptDate(receipt.receipt_date),
          amountTop:
            formatCurrencyAmount(receipt.amount_usd, 'USD') ??
            formatCurrencyAmount(receipt.amount_uah, 'UAH') ??
            '-',
          amountBottom:
            receipt.amount_usd && receipt.amount_uah ?
              formatCurrencyAmount(receipt.amount_uah, 'UAH') ?? undefined
            : undefined,
          products: products.map((product) => mapProductRow(product, receipt.title)),
        };
      }),
      source: 'database',
    };
  } catch (error) {
    console.warn('Failed to load receipts from Postgres, using fallback data instead.', error);

    return {
      receipts: fallbackReceipts,
      source: 'fallback',
    };
  }
}

export async function deleteReceipt(receiptId: number) {
  if (!hasDatabaseConnection()) {
    throw new Error('Database is not configured.');
  }

  const result = await query<{ id: number }>(
    `
      delete from receipts
      where id = $1
      returning id
    `,
    [receiptId],
  );

  return result.rows[0] ?? null;
}

export async function deleteReceiptProduct(productId: number) {
  if (!hasDatabaseConnection()) {
    throw new Error('Database is not configured.');
  }

  const result = await query<{ id: number }>(
    `
      delete from receipt_products
      where id = $1
      returning id
    `,
    [productId],
  );

  return result.rows[0] ?? null;
}
