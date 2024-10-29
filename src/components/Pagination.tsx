"use client"


import { ITEM_PER_PAGE } from "@/lib/settings";
import { useRouter } from "next/navigation";

const Pagination = ({page, count}: {page:number, count:number}) => {
  const router = useRouter()

  const hasPrev = ITEM_PER_PAGE * (page -1) > 0
  const hasNext = ITEM_PER_PAGE * (page -1) + ITEM_PER_PAGE < count

// ******WORKING**************
const totalPages = Math.ceil(count / ITEM_PER_PAGE);




const handleEllipsisClick = (position:string) => {
  if (position === 'start') {
    // If clicking the first ellipsis, jump backwards by 4 pages (or to page 1)
    const newPage = Math.max(1, page - 4);
    changePage(newPage);
  } else {
    // If clicking the end ellipsis, jump forwards by 4 pages (or to last page)
    const newPage = Math.min(totalPages, page + 4);
    changePage(newPage);
  }
};
  
const getPageNumbers = () => {
  const pages = [];
  
  // Always show first page
  pages.push(1);
  
  if (totalPages <= 7) {
    // If total pages is 7 or less, show all pages
    for (let i = 2; i < totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Complex logic for many pages
    if (page <= 3) {
      // Near the start
      pages.push(2, 3, 4, ['ellipsis', 'end']);
    } else if (page >= totalPages - 2) {
      // Near the end
      pages.push(['ellipsis', 'start'], totalPages - 3, totalPages - 2, totalPages - 1);
    } else {
      // Somewhere in the middle
      pages.push(
        ['ellipsis', 'start'],
        page - 1,
        page,
        page + 1,
        ['ellipsis', 'end']
      );
    }
  }
  
  // Always show last page if more than 1 page exists
  if (totalPages > 1) {
    pages.push(totalPages);
  }
  
  return pages;
};
// ******WORKING**************


  const changePage =(newPage:number)=>{
    const params = new URLSearchParams(window.location.search)
    params.set("page", newPage.toString())
    router.push(`${window.location.pathname}?${params}`)
  }


  return (
    <div className="p-4 flex items-center justify-between text-gray-500">
      <button
        disabled={!hasPrev}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        
        onClick={()=>changePage(page -1)}
      >
        Prev
      </button>


      <div className="flex items-center gap-2 text-sm">

      {/* Page numbers and ellipsis */}
      {getPageNumbers().map((pageNumber, index) => {
        if (Array.isArray(pageNumber)) {
          // This is an ellipsis with position info
          const [_, position] = pageNumber;
          return (
            <button
              key={`ellipsis-${position}-${index}`}
              onClick={() => handleEllipsisClick(position)}
              className="px-2 hover:bg-gray-100 rounded-sm cursor-pointer"
              title={position === 'start' ? 'Jump backward' : 'Jump forward'}
            >
              ...
            </button>
          );
        }
        
        return (
          <button
            key={pageNumber}
            onClick={() => changePage(pageNumber)}
            className={`px-2 rounded-sm ${
              page === pageNumber ? "bg-lamaSky text-white" : ""
            }`}
          >
            {pageNumber}
          </button>
        );
      })}

      </div>

      <button
      disabled={!hasNext}
       className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
         onClick={()=>changePage(page +1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
