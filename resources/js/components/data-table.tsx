"use client"


import type {
  ColumnDef,
  ColumnFiltersState,
  OnChangeFn,
  RowSelectionState,
  SortingState,
  VisibilityState} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table"


import { Search, X, Columns3, ChevronLeft, ChevronRight } from "lucide-react"
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  rowSelection?: RowSelectionState
  onRowSelectionChange?: OnChangeFn<RowSelectionState>
}

export function DataTable<TData, TValue>({
  columns,
  data,
  rowSelection: controlledRowSelection,
  onRowSelectionChange: controlledOnRowSelectionChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [internalRowSelection, setInternalRowSelection] = React.useState<RowSelectionState>({})

  const rowSelection = controlledRowSelection ?? internalRowSelection
  const setRowSelection = controlledOnRowSelectionChange ?? setInternalRowSelection

  const [searchValue, setSearchValue] = React.useState("")
  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)

    if (debounceRef.current) {
clearTimeout(debounceRef.current)
}

    debounceRef.current = setTimeout(() => {
      table.setGlobalFilter(value)
    }, 250)
  }

  const clearSearch = () => {
    setSearchValue("")

    if (debounceRef.current) {
clearTimeout(debounceRef.current)
}

    table.setGlobalFilter("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      clearSearch()
    }
  }

  const searchInputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }
    document.addEventListener("keydown", handleGlobalKeyDown)

    return () => document.removeEventListener("keydown", handleGlobalKeyDown)
  }, [])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: { pageSize: 10 },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const pageCount = table.getPageCount()
  const currentPage = table.getState().pagination.pageIndex
  const perPage = table.getState().pagination.pageSize
  const totalRows = table.getFilteredRowModel().rows.length

  const generatePageNumbers = () => {
    const pages: (number | "...")[] = []

    if (pageCount <= 5) {
      for (let i = 0; i < pageCount; i++) {
pages.push(i)
}
    } else if (currentPage <= 2) {
      pages.push(0, 1, 2, 3, "...", pageCount - 1)
    } else if (currentPage >= pageCount - 3) {
      pages.push(0, "...", pageCount - 4, pageCount - 3, pageCount - 2, pageCount - 1)
    } else {
      pages.push(0, "...", currentPage - 1, currentPage, currentPage + 1, "...", pageCount - 1)
    }

    return pages
  }

  const pageNumbers = generatePageNumbers()

  const startRow = totalRows > 0 ? currentPage * perPage + 1 : 0
  const endRow = Math.min((currentPage + 1) * perPage, totalRows)

  return (
    <div className="rounded-xl border border-border/80 bg-card shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            {/* Summary & Controls Row */}
            <tr className="border-b border-border/80 bg-muted/20">
              <td colSpan={columns.length} className="px-4 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Menampilkan <span className="font-semibold text-foreground">{totalRows}</span> data
                  </span>
                  <div className="flex items-center gap-3">
                    {/* Column toggle */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="default" className="gap-2 h-9 hover:!bg-sidebar-hover hover:!text-foreground transition-colors">
                          <Columns3 className="h-4 w-4" />
                          Kolom
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground border-b border-border/50 mb-1">
                          Tampilkan kolom
                        </div>
                        {table
                          .getAllColumns()
                          .filter((column) => column.getCanHide())
                          .map((column) => (
                            <DropdownMenuCheckboxItem
                              key={column.id}
                              className="capitalize text-sm"
                              checked={column.getIsVisible()}
                              onCheckedChange={(value) =>
                                column.toggleVisibility(!!value)
                              }
                            >
                              {column.id}
                            </DropdownMenuCheckboxItem>
                          ))}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Search Input */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Cari di sini..."
                        value={searchValue}
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyDown}
                        className="h-9 w-64 rounded-lg border border-input bg-background pl-9 pr-3 text-sm shadow-xs placeholder:text-muted-foreground focus:border-primary/50 focus:ring-[3px] focus:ring-primary/10 focus:outline-none transition-all"
                      />
                      {searchValue && (
                        <button
                          onClick={clearSearch}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center h-5 w-5 rounded-full text-muted-foreground hover:text-foreground hover:!bg-muted transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </td>
            </tr>

            {/* Column Headers */}
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-border/60 bg-primary/10 hover:bg-transparent even:bg-transparent">
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort()

                  return (
                    <TableHead
                      key={header.id}
                      className={`h-12 px-4 text-sm font-normal capitalize tracking-wider text-foreground border-r border-border/80 last:border-r-0 ${header.column.id === "select" ? "w-12 max-w-12" : ""} ${canSort ? "cursor-pointer select-none hover:bg-sidebar-hover transition-colors" : ""}`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </thead>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b border-border/80 last:border-0 hover:bg-muted/50 transition-colors duration-150 data-[state=selected]:bg-primary/5"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={`px-4 py-3 border-r border-border/80 last:border-r-0 ${cell.column.id === "select" ? "w-12 max-w-12" : ""}`}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-40 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted/50">
                      <Search className="h-5 w-5 opacity-40" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Data tidak ditemukan</p>
                      <p className="text-xs text-muted-foreground/70 mt-0.5">
                        Coba ubah filter atau kata kunci pencarian
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          {/* Pagination Footer */}
          {totalRows > 0 && (
            <tfoot>
              <tr className="border-t border-border/60 bg-muted/20">
                <td colSpan={columns.length} className="px-4 py-3">
                  <div className="flex items-center justify-between">
                    {/* Left: Range info + Show per page */}
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>
                        {totalRows > 0
                          ? `${startRow}-${endRow} of ${totalRows}`
                          : "0 of 0"}
                      </span>
                      <div className="h-4 w-px bg-border" />
                      <span>Show</span>
                      <Select
                        value={String(perPage)}
                        onValueChange={(value) => table.setPageSize(Number(value))}
                      >
                        <SelectTrigger size="sm" className="h-8 w-auto px-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10" className="focus:bg-muted focus:text-foreground">10</SelectItem>
                          <SelectItem value="25" className="focus:bg-muted focus:text-foreground">25</SelectItem>
                          <SelectItem value="50" className="focus:bg-muted focus:text-foreground">50</SelectItem>
                          <SelectItem value="100" className="focus:bg-muted focus:text-foreground">100</SelectItem>
                          <SelectItem value={String(totalRows)} className="focus:bg-muted focus:text-foreground">All</SelectItem>
                        </SelectContent>
                      </Select>
                      <span>per page</span>
                    </div>

                    {/* Right: Page numbers */}
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="h-8 w-8 p-0 hover:!bg-muted hover:!text-foreground"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>

                      {pageNumbers.map((page, index) =>
                        page === "..." ? (
                          <span key={`ellipsis-${index}`} className="px-1 text-muted-foreground">
                            ...
                          </span>
                        ) : (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => table.setPageIndex(page)}
                            className={`h-8 w-8 p-0 ${currentPage === page ? "" : "hover:!bg-muted hover:!text-foreground"}`}
                          >
                            {page + 1}
                          </Button>
                        )
                      )}

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="h-8 w-8 p-0 hover:!bg-muted hover:!text-foreground"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  )
}
