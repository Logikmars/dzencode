insert into receipts (id, title, receipt_date, amount_usd, amount_uah)
values
  (1, 'Поставка серверного оборудования', '2017-04-06', 4800.00, 129600.00),
  (2, 'Поставка сетевого оборудования', '2017-09-06', 6200.00, 167400.00),
  (3, 'Поставка аксессуаров и периферии', '2017-06-06', 3900.00, 105300.00),
  (4, 'Крупная поставка складского ИТ-оборудования', '2017-02-06', 18400.00, 496800.00)
on conflict (id) do update
set
  title = excluded.title,
  receipt_date = excluded.receipt_date,
  amount_usd = excluded.amount_usd,
  amount_uah = excluded.amount_uah;

insert into receipt_products (
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
)
select
  1000 + gs,
  1,
  case gs
    when 1 then 'Supermicro 1U Server'
    when 2 then 'Dell PowerEdge R640'
    when 3 then 'HP ProLiant DL360'
    else 'Intel Server Board комплект'
  end,
  format('SRV-2017-01-%s', lpad(gs::text, 3, '0')),
  case gs
    when 1 then 'Node A'
    when 2 then 'Node B'
    when 3 then 'Backup Node'
    else 'Spare Unit'
  end,
  case
    when gs in (2, 4) then 'В ремонте'
    else 'Свободен'
  end,
  date '2017-04-06',
  date '2025-08-06',
  1200.00,
  32400.00,
  'Серверы',
  'ServerMall',
  'Серверная',
  date '2017-04-08'
from generate_series(1, 4) as gs
on conflict (id) do update
set
  receipt_id = excluded.receipt_id,
  title = excluded.title,
  serial_number = excluded.serial_number,
  specification = excluded.specification,
  status = excluded.status,
  receipt_date = excluded.receipt_date,
  guarantee_until = excluded.guarantee_until,
  price_usd = excluded.price_usd,
  price_uah = excluded.price_uah,
  group_name = excluded.group_name,
  seller = excluded.seller,
  owner = excluded.owner,
  arrival_date = excluded.arrival_date;

insert into receipt_products (
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
)
select
  2000 + gs,
  2,
  case
    when gs <= 3 then 'Cisco Catalyst 9300'
    when gs <= 5 then 'MikroTik CCR1036'
    else 'Ubiquiti EdgeSwitch 48'
  end,
  format('NET-2017-02-%s', lpad(gs::text, 3, '0')),
  case
    when gs <= 3 then format('Floor %s uplink', gs)
    when gs <= 5 then format('Core Router %s', gs - 3)
    else format('Access Switch %s', gs - 5)
  end,
  case
    when gs in (3, 7) then 'Выдан'
    when gs = 5 then 'В ремонте'
    else 'Свободен'
  end,
  date '2017-09-06',
  date '2026-09-06',
  case
    when gs <= 3 then 850.00
    when gs <= 5 then 950.00
    else 687.50
  end,
  case
    when gs <= 3 then 22950.00
    when gs <= 5 then 25650.00
    else 18562.50
  end,
  'Сетевое оборудование',
  'NetSystems',
  'Сетевой отдел',
  date '2017-09-09'
from generate_series(1, 8) as gs
on conflict (id) do update
set
  receipt_id = excluded.receipt_id,
  title = excluded.title,
  serial_number = excluded.serial_number,
  specification = excluded.specification,
  status = excluded.status,
  receipt_date = excluded.receipt_date,
  guarantee_until = excluded.guarantee_until,
  price_usd = excluded.price_usd,
  price_uah = excluded.price_uah,
  group_name = excluded.group_name,
  seller = excluded.seller,
  owner = excluded.owner,
  arrival_date = excluded.arrival_date;

insert into receipt_products (
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
)
select
  3000 + gs,
  3,
  case
    when gs <= 4 then 'Logitech Keyboard K120'
    when gs <= 8 then 'Logitech Mouse B100'
    when gs <= 10 then 'APC Back-UPS 900'
    else 'Kingston SSD 480GB'
  end,
  format('ACC-2017-03-%s', lpad(gs::text, 3, '0')),
  case
    when gs <= 4 then format('Workplace keyboard %s', gs)
    when gs <= 8 then format('Workplace mouse %s', gs - 4)
    when gs <= 10 then format('UPS %s', gs - 8)
    else format('Spare SSD %s', gs - 10)
  end,
  case
    when gs in (2, 6, 11) then 'Выдан'
    else 'Свободен'
  end,
  date '2017-06-06',
  date '2024-06-06',
  case
    when gs <= 4 then 20.00
    when gs <= 8 then 15.00
    when gs <= 10 then 140.00
    else 80.00
  end,
  case
    when gs <= 4 then 540.00
    when gs <= 8 then 405.00
    when gs <= 10 then 3780.00
    else 2160.00
  end,
  case
    when gs <= 8 then 'Периферия'
    when gs <= 10 then 'Питание'
    else 'Накопители'
  end,
  'Office Trade',
  'Офис',
  date '2017-06-10'
from generate_series(1, 12) as gs
on conflict (id) do update
set
  receipt_id = excluded.receipt_id,
  title = excluded.title,
  serial_number = excluded.serial_number,
  specification = excluded.specification,
  status = excluded.status,
  receipt_date = excluded.receipt_date,
  guarantee_until = excluded.guarantee_until,
  price_usd = excluded.price_usd,
  price_uah = excluded.price_uah,
  group_name = excluded.group_name,
  seller = excluded.seller,
  owner = excluded.owner,
  arrival_date = excluded.arrival_date;

insert into receipt_products (
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
)
select
  4000 + gs,
  4,
  case
    when gs <= 6 then 'Zebra DS2208 Scanner'
    when gs <= 10 then 'Honeywell PC42 Printer'
    when gs <= 14 then 'Lenovo ThinkCentre M720q'
    when gs <= 17 then 'Dell P2422H Monitor'
    else 'TP-Link TL-SG108'
  end,
  format('WH-2017-04-%s', lpad(gs::text, 3, '0')),
  case
    when gs <= 6 then format('Warehouse scanner %s', gs)
    when gs <= 10 then format('Label printer %s', gs - 6)
    when gs <= 14 then format('Operator station %s', gs - 10)
    when gs <= 17 then format('Display %s', gs - 14)
    else format('Small switch %s', gs - 17)
  end,
  case
    when gs in (4, 9, 16) then 'В ремонте'
    when gs in (2, 7, 12, 18) then 'Выдан'
    else 'Свободен'
  end,
  date '2017-02-06',
  date '2026-02-06',
  case
    when gs <= 6 then 180.00
    when gs <= 10 then 260.00
    when gs <= 14 then 520.00
    when gs <= 17 then 210.00
    else 70.00
  end,
  case
    when gs <= 6 then 4860.00
    when gs <= 10 then 7020.00
    when gs <= 14 then 14040.00
    when gs <= 17 then 5670.00
    else 1890.00
  end,
  case
    when gs <= 10 then 'Склад'
    when gs <= 17 then 'Рабочие места'
    else 'Коммутация'
  end,
  'Warehouse Tech Supply',
  'Складской отдел',
  date '2017-02-10'
from generate_series(1, 20) as gs
on conflict (id) do update
set
  receipt_id = excluded.receipt_id,
  title = excluded.title,
  serial_number = excluded.serial_number,
  specification = excluded.specification,
  status = excluded.status,
  receipt_date = excluded.receipt_date,
  guarantee_until = excluded.guarantee_until,
  price_usd = excluded.price_usd,
  price_uah = excluded.price_uah,
  group_name = excluded.group_name,
  seller = excluded.seller,
  owner = excluded.owner,
  arrival_date = excluded.arrival_date;
