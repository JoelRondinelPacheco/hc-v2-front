"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataTablePagination } from "./data-table-pagination"
import { Pageable } from "@/domain/commons.domain"
import { CategoryEntity } from "@/domain/category.domain"

interface DataTablePageProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  rowCount: number,
  pagination: Pageable,
  setPagination: React.Dispatch<React.SetStateAction<Pageable>>
  updateDataFn: (object: TData) => void
}

export function DataTablePage<TData, TValue>({
  columns,
  data,
  rowCount,
  pagination,
  setPagination,
  updateDataFn
}: DataTablePageProps<TData, TValue>) {

  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    rowCount: rowCount,
      // pageCount: dataQuery.data?.pageCount, //alternatively directly pass in pageCount instead of rowCount
    onPaginationChange: setPagination,
    meta: {
      updateData: (cat: CategoryEntity) => {
        console.log("en table meta")
        console.log(cat)
                // Skip page index reset until after next rerender
        //skipAutoResetPageIndex()
        updateDataFn(cat)
      }
    },
    state: {
      //...
      pagination,
    }
  })

  return (
    <div>
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
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
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DataTablePagination table={table} />

    </div>

          </div>
  )
}
