import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function Pagination({
    className = "",
    currentPage = 1,
    from = 0,
    to = 0,
    total = 0,
    // rowsPerPage = 10,
    // onRowsPerPageChange,
    onPageChange,
    disableNext = true,
    disablePrev = true,
    ...props
}) {
    return (
        <div className={className} {...props}>
            <div className="flex items-center justify-end border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div
                    aria-label="Pagination"
                    className="flex items-center justify-center rounded-md shadow-sm"
                >
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={disablePrev || total == 0}
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                        <ChevronLeftIcon
                            aria-hidden="true"
                            className="h-5 w-5"
                        />
                    </button>
                    <div className="px-2">
                        <p className="text-sm text-gray-700">
                            <span className="font-medium">{from}</span> -
                            <span className="font-medium"> {to}</span> of
                            <span className="font-medium"> {total}</span>
                        </p>
                    </div>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={disableNext || total == 0}
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                        <ChevronRightIcon
                            aria-hidden="true"
                            className="h-5 w-5"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}
