export function ReceiptListSkeleton() {
  return (
    <main className='page Main'>
      <div className='Main_header'>
        <div className='Main_addButton Main_addButton--skeleton' aria-hidden='true' />
        <div className='Main_titleSkeleton' aria-hidden='true' />
      </div>

      <div className='Main_list'>
        {Array.from({ length: 6 }).map((_, index) => (
          <div className='Main_row Main_row--skeleton' key={index} aria-hidden='true'>
            <div className='Main_skeletonLine Main_skeletonLine--title' />
            <div className='Main_skeletonMeta'>
              <div className='Main_roundIcon Main_roundIcon--skeleton' />
              <div className='Main_skeletonStack'>
                <div className='Main_skeletonLine Main_skeletonLine--count' />
                <div className='Main_skeletonLine Main_skeletonLine--label' />
              </div>
            </div>
            <div className='Main_skeletonStack'>
              <div className='Main_skeletonLine Main_skeletonLine--date' />
              <div className='Main_skeletonLine Main_skeletonLine--dateSmall' />
            </div>
            <div className='Main_skeletonStack'>
              <div className='Main_skeletonLine Main_skeletonLine--amount' />
              <div className='Main_skeletonLine Main_skeletonLine--amountSmall' />
            </div>
            <div className='Main_deleteButton Main_deleteButton--skeleton' />
          </div>
        ))}
      </div>
    </main>
  );
}
