import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createExpandedRowModel,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  rowExpandingFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_text,
  tableFeatures,
} from "@tanstack/react-table"

const dataTableFeatures = tableFeatures({
  columnFilteringFeature,
  columnVisibilityFeature,
  rowExpandingFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  expandedRowModel: createExpandedRowModel(),
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
  filterFns: { includesString: filterFn_includesString },
  sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },
})

type DataTableFeatures = typeof dataTableFeatures

export { dataTableFeatures, type DataTableFeatures }
