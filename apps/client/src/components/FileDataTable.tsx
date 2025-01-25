import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown } from "lucide-react"

import { Button } from "@dropbox/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@dropbox/ui/components/dropdown-menu"
import { Input } from "@dropbox/ui/components/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@dropbox/ui/components/table"
import { useAppSelector } from "../redux/store"
import { FileMetadata } from "../types/File"
import { getFileTypeIcon, formatFileSize, MIME_TO_EXTENSION } from "../types/IconMap"
import { ButtonVariantType } from "../types/ButtonVariant"
import { useFilePreview } from "../hooks/use-file-viewer"
import FilePreview from "./common/FilePreview"

export function FileDataTable() {
 
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const { previewFile, isLoading, error, previewFileHandler,setPreviewFile } = useFilePreview()

  const files = useAppSelector((state) => state.fileManagement.files)
  const closePreview = () => {
    setPreviewFile(null)
  }
console.log(files)
  const columns: ColumnDef<FileMetadata>[] = [
    {
      accessorKey: "fileName",
      header: ({ column }) => (
        <Button
          variant={ButtonVariantType.Ghost}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full justify-start"
        >
          File Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const FileIcon = getFileTypeIcon(row.original.fileType)
        return (
          <div
          className="flex items-center space-x-2 cursor-pointer hover:underline"
          onClick={() => previewFileHandler(row.original)}
        >
          <FileIcon className="h-4 w-4 text-gray-500" />
          <span className="lowercase truncate max-w-[150px]">
            {row.getValue("fileName")}
          </span>
        </div>
        )
      },
    },
    {
      accessorKey: "fileType",
      header: "File Type",
      cell: ({ row }) => <div className="truncate">{row.getValue("fileType")}</div>,
    },
    {
      accessorKey: "fileSize",
      header: () => <div className="text-right">File Size</div>,
      cell: ({ row }) => {
        const size = row.getValue("fileSize")
        return <div className="text-right font-medium">{formatFileSize(Number(size))}</div>
      },
    },
    {
      accessorKey: "lastModified",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full justify-start"
        >
          Uploaded at
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue("lastModified"))
        return <div>{date.toLocaleDateString()} {date.toLocaleTimeString()}</div>
      },
    },
  ]

  const table = useReactTable({
    data: files,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 py-4 sm:text-sm">
        <Input
          placeholder="Filter by file name"
          value={(table.getColumn("fileName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("fileName")?.setFilterValue(event.target.value)
          }
          className="w-full sm:max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="sentence-case"
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
      </div>

     
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead 
                      key={header.id} 
                      className="dark:bg-muted/50 bg-gray-200 whitespace-nowrap"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="text-xs">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="whitespace-nowrap">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Nothing to see here!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {previewFile && (
      <FilePreview s3Path={previewFile.s3Path} filePathBlob={previewFile.filePath} fileType={previewFile.fileType} error={error} isLoading={isLoading} onClose={closePreview}/>
      )}
    </div>
  )
}