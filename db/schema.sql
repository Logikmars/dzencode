create table if not exists receipts (
  id bigserial primary key,
  title text not null,
  receipt_date date not null,
  amount_usd numeric(12, 2),
  amount_uah numeric(12, 2),
  created_at timestamptz not null default now()
);

create table if not exists receipt_products (
  id bigserial primary key,
  receipt_id bigint not null references receipts(id) on delete cascade,
  title text not null,
  serial_number text not null,
  specification text not null,
  status text not null,
  receipt_date date not null,
  guarantee_until date not null,
  price_usd numeric(12, 2),
  price_uah numeric(12, 2),
  group_name text,
  seller text,
  owner text,
  arrival_date date not null,
  created_at timestamptz not null default now()
);

create index if not exists receipt_products_receipt_id_idx on receipt_products (receipt_id);
create index if not exists receipt_products_status_idx on receipt_products (status);
create index if not exists receipt_products_specification_idx on receipt_products (specification);
