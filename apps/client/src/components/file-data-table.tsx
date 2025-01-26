import * as React from "react";
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
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, Download } from "lucide-react";

import { Button } from "@dropbox/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@dropbox/ui/components/dropdown-menu";
import { Input } from "@dropbox/ui/components/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@dropbox/ui/components/table";
import { useAppSelector } from "../redux/store";
import { FileMetadata } from "../types/file";
import { getFileTypeIcon, formatFileSize } from "../types/icon-map";
import { ButtonVariantType } from "../types/button-variant";
import { useFilePreview } from "../hooks/use-file-viewer";
import FilePreview from "./common/file-preview";
import { useCopyToClipboard } from "../hooks/use-clipboard";
import { useDownload } from "../hooks/use-download";
import IconTextItem from "./common/icon-text-item";
import { useNewTab } from "../hooks/use-new-tab";

export function FileDataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const {
    previewFile,
    previewFileHandler,
    setPreviewFile,
  } = useFilePreview();
  const { CopyButton } = useCopyToClipboard();
  const { download } = useDownload();
  const { NewTabIcon } = useNewTab();
  const files = useAppSelector((state) => state.fileManagement.files);
  const closePreview = () => {
    setPreviewFile(null);
  };

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
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const FileIcon = getFileTypeIcon(row.original.fileType);
        return (
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => previewFileHandler(row.original)}
          >
            <IconTextItem
              icon={<FileIcon className="h-4 w-4 text-gray-500" />}
              onClick={() => previewFileHandler(row.original)}
            >
               <span className={`text-xs font-medium truncate max-w-[250px]`}>{row.getValue("fileName").toString()}</span>
              </IconTextItem>
          </div>
        );
      },
    },
    {
      accessorKey: "Open",
      header: ({ column }) => (
        <div className="flex items-center justify-center">Open</div>
      ),
      cell: ({ row }) => {
        const fileId: string = row.original.id;
        return <NewTabIcon fileId={fileId} />;
      },
    },
    {
      accessorKey: "s3Path",
      header: ({ column }) => (
        <div className="flex items-center justify-center">Path</div>
      ),
      cell: ({ row }) => {
        const pathToCopy: string = row.getValue("s3Path");
        return <CopyButton text={pathToCopy} />;
      },
    },
    {
      accessorKey: "fileType",
      header: "File Type",
      cell: ({ row }) => (
        <div className="truncate">{row.getValue("fileType")}</div>
      ),
    },
    {
      accessorKey: "fileSize",
      header: () => <div className="text-right">File Size</div>,
      cell: ({ row }) => {
        const size = row.getValue("fileSize");
        return (
          <div className="text-right font-medium">
            {formatFileSize(Number(size))}
          </div>
        );
      },
    },
    {
      accessorKey: "uploadedAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full justify-end "
        >
          Uploaded at
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue("uploadedAt"));
        return (
          <div className=" text-right p-2 ">
            {date.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}{" "}
            {date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        );
      },
    },
    {
      accessorKey: "Download",
      header: "Download",
      cell: ({ row }) => {
        const s3Path: string = row.getValue("s3Path");
        return (
          <Button
            variant={ButtonVariantType.Ghost}
            onClick={() => download(s3Path)}
          >
            <Download />
          </Button>
        );
      },
    },
  ];

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
  });

  return (
    <div className="w-full h-full">
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 py-4 sm:text-sm">
        <Input
          placeholder="Filter by file name"
          value={
            (table.getColumn("fileName")?.getFilterValue() as string) ?? ""
          }
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
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="dark:bg-zinc-900  bg-gray-200 whitespace-nowrap sticky top-0 z-1"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
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
                        cell.getContext(),
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
      <div className="flex items-center justify-end space-x-2 py-4">

      <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
          </div>
        </div>
      {previewFile && (
        <FilePreview
          s3Path={previewFile.s3Path}
          filePathBlob={previewFile.filePath}
          fileType={previewFile.fileType}
          onClose={closePreview}
        />
      )}
    </div>
  );
}
