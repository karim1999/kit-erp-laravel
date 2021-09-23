import React from "react";
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, usePagination, useRowSelect } from 'react-table'
import {matchSorter} from 'match-sorter'
import CheckBoxFieldComponent from "../Fields/CheckBoxFieldComponent";
import Constants from "../../../../helpers/samples";

const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef()
        const resolvedRef = ref || defaultRef

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate
        }, [resolvedRef, indeterminate])

        return (
            <>
                <div className="custom-control form-check">
                    <label className="form-check-label" >
                        <input type="checkbox" ref={resolvedRef} {...rest} />
                    </label>
                </div>
            </>
        )
    }
)
// Define a default UI for filtering
function GlobalFilter({
                          preGlobalFilteredRows,
                          globalFilter,
                          setGlobalFilter,
                      }) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <span>
            Search:{' '}
            <input
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
                className="form-control"
            />
        </span>
    )
}
// Define a default UI for filtering
function DefaultColumnFilter({
                                 column: { filterValue, preFilteredRows, setFilter },
                             }) {
    const count = preFilteredRows.length

    return (
        <input
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
            }}
            className="form-control"
            placeholder={`Search ${count} records...`}
        />
    )
}
function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

export default function ({push, products}){
    const closeBtn = React.useRef(null);
    const filterTypes = React.useMemo(
        () => ({
            // Add a new fuzzyTextFilterFn filter type.
            fuzzyText: fuzzyTextFilterFn,
            // Or, override the default text filter to use
            // "startWith"
            text: (rows, id, filterValue) => {
                return rows.filter(row => {
                    const rowValue = row.values[id]
                    return rowValue !== undefined
                        ? String(rowValue)
                            .toLowerCase()
                            .startsWith(String(filterValue).toLowerCase())
                        : true
                })
            },
        }),
        []
    )

    const defaultColumn = React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
    )
    const data = React.useMemo(
        () => products,
        []
    )

    const columns = React.useMemo(
        () => [
            {
                Header: 'Price Book',
                accessor: 'price_book_name',
                filterable: true,
            },
            {
                Header: 'Part Number',
                accessor: 'Product_Code',
                filterable: true,
            },
            {
                Header: 'Name',
                accessor: 'Product_Name',
                filter: 'fuzzyText',
                filterable: true,
            },
            {
                Header: 'Unit Price',
                accessor: 'Unit_Price',
                // filterable: true,
            },
            {
                Header: 'Cost Price',
                accessor: 'Cost_Price',
                // filterable: true,
            },
            {
                Header: 'List Price',
                accessor: 'list_price',
                // filterable: true,
            },
            {
                Header: 'Group',
                accessor: 'Product_Group',
                filterable: true,
            },
            {
                Header: 'Type',
                accessor: 'Product_Type',
                filterable: true,
            },
            {
                Header: 'Category',
                accessor: 'Product_Category',
                filterable: true,
            },
            {
                Header: 'Unit',
                accessor: 'Usage_Unit',
                // filterable: true,
            },
        ],
        []
    )


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        setAllFilters,
        selectedFlatRows,
        toggleAllRowsSelected,
    } = useTable({
        columns,
        data,
        defaultColumn, // Be sure to pass the defaultColumn option
        filterTypes,
    },
        useFilters, // useFilters!
        useGlobalFilter, // useGlobalFilter!
        usePagination,
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
                // Let's make a column for selection
                {
                    id: 'selection',
                    // The header can use the table's getToggleAllRowsSelectedProps method
                    // to render a checkbox
                    Header: ({ getToggleAllPageRowsSelectedProps }) => (
                        <div>
                            <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
                        </div>
                    ),
                    // The cell can use the individual row's getToggleRowSelectedProps method
                    // to the render a checkbox
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    ),
                },
                ...columns,
            ])
        }
    )

    const pushToItems= () => {
        // console.log(selectedFlatRows)
        selectedFlatRows.forEach(item => {
            console.log({...Constants.samplePricingItem, product_id: item.id})
            console.log({item})
            push({...Constants.samplePricingItem, product_id: item.original.id, justAdded: true})
        });
        // state.reset();
        closeBtn.current.click()
    }

    const reset= () => {
        setAllFilters([])
        gotoPage(1)
        toggleAllRowsSelected(false)
    }

    const firstPageRows = rows.slice(0, 10)
    return (
        <div className="modal" id="multiModal" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-xl" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add List Items</h5>
                        <button onClick={reset} type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="table-responsive scrollBox">
                            <table {...getTableProps()} className="table table-bordered">
                                <thead className="table-info">
                                {headerGroups.map(headerGroup => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map(column => (
                                            <th
                                                {...column.getHeaderProps()}
                                                className="fit"
                                            >
                                                {column.render('Header')}
                                                <div>{column.filterable ? column.render('Filter') : null}</div>
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                                <tr>
                                    <th
                                        colSpan={visibleColumns.length}
                                        style={{
                                            textAlign: 'left',
                                        }}
                                    >
                                        <GlobalFilter
                                            preGlobalFilteredRows={preGlobalFilteredRows}
                                            globalFilter={state.globalFilter}
                                            setGlobalFilter={setGlobalFilter}
                                        />
                                    </th>
                                </tr>
                                </thead>
                                <tbody {...getTableBodyProps()}>
                                {page.map(row => {
                                    prepareRow(row)
                                    return (
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map(cell => {
                                                return (
                                                    <td
                                                        {...cell.getCellProps()}
                                                        className="fit"
                                                    >
                                                        {cell.render('Cell')}
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                        <br />
                        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-center flex-wrap">
                                <li className="page-item">
                                    <button className="page-link" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                                </li>
                                <li className="page-item">
                                    <button className="page-link" onClick={() => previousPage()} disabled={!canPreviousPage}>{'<'}</button>
                                </li>
                                <select
                                    className="form-control w-auto"
                                    value={state.pageIndex}
                                    onChange={e => {
                                        gotoPage(Number(e.target.value))
                                    }}
                                >
                                    {
                                        Array.apply(0, Array(pageCount)).map((x, i) => (
                                            <option key={i} value={i}>{i+1}</option>
                                        ))
                                    }
                                </select>

                                <li className="page-item">
                                    <button className="page-link" onClick={() => nextPage()} disabled={!canNextPage}>{'>'}</button>
                                </li>
                                <li className="page-item">
                                    <button className="page-link" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
                                </li>
                            </ul>
                        </nav>
                        <div className="pagination">
                            {/*<span>*/}
                            {/*    Page{' '}*/}
                            {/*    <strong>*/}
                            {/*        {state.pageIndex + 1} of {pageOptions.length}*/}
                            {/*    </strong>{' '}*/}
                            {/*</span>*/}
                            {/*<span>*/}
                            {/*    | Go to page:{' '}*/}
                            {/*    <input*/}
                            {/*        type="number"*/}
                            {/*        defaultValue={state.pageIndex + 1}*/}
                            {/*        onChange={e => {*/}
                            {/*            const page = e.target.value ? Number(e.target.value) - 1 : 0*/}
                            {/*            gotoPage(page)*/}
                            {/*        }}*/}
                            {/*        style={{ width: '100px' }}*/}
                            {/*    />*/}
                            {/*</span>{' '}*/}
                            {/*<select*/}
                            {/*    value={state.pageSize}*/}
                            {/*    onChange={e => {*/}
                            {/*        setPageSize(Number(e.target.value))*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*    {[10, 20, 30, 40, 50].map(pageSize => (*/}
                            {/*        <option key={pageSize} value={pageSize}>*/}
                            {/*            Show {pageSize}*/}
                            {/*        </option>*/}
                            {/*    ))}*/}
                            {/*</select>*/}
                            {/*<pre>*/}
                            {/*    <code>*/}
                            {/*        {JSON.stringify(*/}
                            {/*            {*/}
                            {/*                selectedRowIds: state.selectedRowIds,*/}
                            {/*                'selectedFlatRows[].original': selectedFlatRows.map(*/}
                            {/*                    d => d.original*/}
                            {/*                ),*/}
                            {/*            },*/}
                            {/*            null,*/}
                            {/*            2*/}
                            {/*        )}*/}
                            {/*    </code>*/}
                            {/*</pre>*/}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button onClick={pushToItems} type="button" className="btn btn-primary">Save changes</button>
                        <button ref={closeBtn} onClick={reset} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
