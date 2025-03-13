

import TableBody from '@mui/material/TableBody';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DateTimePicker, DesktopDateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import moment from 'moment';
import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateTimePickerChangeArrayRowDowns, TextFieldChangeArrayRowDowns } from '../../redux/ArrayRowDowns';
interface TableDateTimePickerProps {
    columns: GridColDef[];
    rows: GridRowsProp;
    handlerowClick?: any,
    onDoubleClick?: any,
    arrEditCell?: string[],
    listChx?: (rows: GridRowsProp) => void,
    arrNotShowCell?: string[],
    tableName?: string,
    checkOrderNo?: boolean
    checkOther?: boolean
}
const TableDateTimePicker = (props: TableDateTimePickerProps) => {
    const { columns, rows, onDoubleClick, arrEditCell, listChx, arrNotShowCell, tableName, handlerowClick, checkOrderNo, checkOther } = props;
    const MaterialTableChecked = useSelector((state: any) => state.MaterialTableChecked.items);
    const StockoutDetailChecked = useSelector((state: any) => state.StockoutDetailChecked.items);
    const [selected, setSelected] = useState<GridRowsProp>([])
    const [editingCellId, setEditingCellId] = useState<number | null>(null);
    const [selectedRow, setSelectedRow] = useState("");
    const [selectedColumn, setSelectedColumn] = useState("");
    const dispatch = useDispatch();
    const ArrayRowDowns = useSelector((state: any) => state.ArrayRowDowns.items);
    const dataUser = useSelector((state: any) => state.UserLogin.user);
    useEffect(() => {
        setSelected([])
    }, [rows])
    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelected(rows);
            listChx !== undefined ? listChx(rows) : [];
            return
        }
        setSelected([]);
        listChx !== undefined ? listChx([]) : [];



    }

    const handleOnChangeArrivalQty = (rowInd: number, colName: string, value: string, dataRow: any) => {

    }
    const handleClick = (event: React.MouseEvent<unknown>, item: any) => {
        let newSlected: any[] = [];
        const foungObj1 = selected.find((obj: any) => obj._id === item._id)
        if (foungObj1 === undefined) {
            newSlected = newSlected.concat(selected, item)

        } else {
            newSlected = selected.filter((item1: any) => item1._id !== item._id)
        }
        setSelected(newSlected)
        listChx !== undefined ? listChx(newSlected) : [];
    }
    const isSelected = (id: number) => selected.findIndex((item: any) => item._id === id) !== -1;

    const handleRowClick = (params: any, item: any) => {

    }
    const handleCellBlur = (event: React.FocusEvent<HTMLDivElement>, id: number) => {
        setEditingCellId(null)
    }
    const handleOnBlurTextField = (rowInd: number, colName: string, value: string, dataRow: any) => {
        if (colName == "Arrival_QTY" && checkOrderNo === true && dataUser[0].factoryName === "LVL" && dataUser[0].UserRole !== "Manager" && checkOther == false) {
            handleOnChangeArrivalQty(rowInd, colName, value, dataRow)
        }
    }

    const handleTextFieldChange = (rowInd: number, colName: string, value: string) => {
        dispatch(TextFieldChangeArrayRowDowns({ _id: rowInd, columnName: colName, value: value }))
    }
    const handleDateTimePickerChange = (rowInd: number, colName: string, params: any) => {
        if (colName === 'ywsm_Production') {
            dispatch(DateTimePickerChangeArrayRowDowns({ _id: rowInd, columnName: colName, value: moment(params, "MMMM-YYYY").format("MMM-YYYY") }))
        }
        else if (colName === 'ngay' || colName === 'CGDate_Date') {
            dispatch(DateTimePickerChangeArrayRowDowns({ _id: rowInd, columnName: colName, value: moment(params).format("YYYY-MM-DD") }))


        }
    }

    return (
        <TableContainer sx={{ height: '100%' }}>
            <Table size={"small"} sx={{ width: 'fix-content' }} stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                            <Checkbox
                                indeterminate={
                                    selected.length > 0 && selected.length < rows.length
                                }
                                checked={selected.length === rows.length}
                                onChange={handleSelectAllClick}
                                inputProps={{ "aria-label": "select all desserts" }}></Checkbox>
                        </TableCell>
                        {columns.map((item: any, index: number) => {
                            return (
                                <TableCell
                                    className="td-responesive"
                                    key={index}
                                    align={"left"}
                                    sx={{
                                        whiteSpace: "nowrap",
                                        color: "orange",
                                    }}
                                >
                                    {item.headerName}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody sx={{
                    overflow: "scroll",
                    "& td": {
                        whiteSpace: "pre",
                    },
                }}>
                    {rows.map((item: any, index: number) => {
                        return (
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        onClick={(event) => {
                                            handleClick(event, item)

                                        }
                                        }
                                        role="checkbox"
                                        aria-checked={false}
                                        checked={isSelected(item._id)}
                                        inputProps={{
                                            "aria-labelledby": `checkbox-${item._id}`,
                                        }}
                                    />
                                </TableCell>
                                {Object.keys(item).map((key, i) => {
                                    const column = columns.find((col) => col.field === key);
                                    if (column) {
                                        const isProductionCell = key === "ywsm_Production" || key === "ngay" || key === 'CGDate_Date';
                                        const isEditing = editingCellId === item._id && (arrEditCell !== undefined && arrEditCell.includes(key));
                                        return (
                                            <TableCell
                                                className="td-responesive"
                                                key={i}
                                                onClick={() => {
                                                    handleRowClick(key, item)
                                                    setSelectedRow(
                                                        item._id === selectedRow ? null : item._id
                                                    );
                                                }}
                                                onBlur={(event) => handleCellBlur(event, item._id)}
                                                height={'35px'}
                                                sx={
                                                    item.RY_Status2 && item.RY_Status2 === "In" && item.RY && item.RY.indexOf('/A') != -1 ? { color: 'yellow' } : item.RY_Status2 && item.RY_Status2 === "In" ? { color: 'orange' } : {}
                                                }
                                            >
                                                {
                                                    isEditing && !isProductionCell && selectedColumn == key ? (
                                                        <TextField

                                                            defaultValue={item[key]}
                                                            onChange={(event) => handleTextFieldChange(index, key, event.target.value)}
                                                            onBlur={(event) => handleOnBlurTextField(index, key, event.target.value, item)}
                                                            size="small"
                                                            autoFocus
                                                            sx={{
                                                                '& .MuiInputBase-input': {
                                                                    padding: 0,
                                                                    width: `${item[key] !== undefined && item[key] != null && !Number.isNaN(item[key].length * 1) && (item[key].length * 8) + 40}px`,
                                                                    // textAlign: 'center',
                                                                    fontSize: '17px',
                                                                    '@media screen and (max-width: 1200px)': {
                                                                        fontSize: '15px !important',
                                                                        textAlign: 'center',
                                                                    },
                                                                },

                                                            }}
                                                        />
                                                    ) : isProductionCell && key === "ywsm_Production" ? (

                                                        <LocalizationProvider dateAdapter={AdapterMoment} dateFormats={{
                                                            monthAndYear: "MM/YYYY",
                                                        }}>

                                                            <DesktopDateTimePicker
                                                                className="td-responesive"
                                                                format={"MMMM YYYY"}
                                                                // value={selectedDateArr[index]}
                                                                // defaultValue={key === "ngay" ? moment() : null}
                                                                onChange={(params) => handleDateTimePickerChange(index, key, params)}
                                                                views={['month', 'year']}
                                                                slotProps={{
                                                                    toolbar: {
                                                                        hidden: true,
                                                                    },
                                                                    textField: {
                                                                        inputProps: {
                                                                            sx: {
                                                                                height: "0.5rem",
                                                                                textAlign: "center",
                                                                            },
                                                                        },

                                                                    },
                                                                }}
                                                                sx={{
                                                                    width: '180px',
                                                                    '& .MuiInputBase-input': {
                                                                        fontSize: '15px',
                                                                        '@media screen and (max-width: 1200px)': {
                                                                            fontSize: '15px !important',
                                                                        },
                                                                    },
                                                                }} />
                                                        </LocalizationProvider>

                                                    ) : isProductionCell && (key === "ngay" || key === 'CGDate_Date') && (moment(item["ngay"]).format("YYYY-MM-DD") !== "1975-04-30") && (moment(item["ngay"]).format("YYYY-MM-DD") !== "1945-02-09")
                                                        ?
                                                        (
                                                            <LocalizationProvider dateAdapter={AdapterMoment} dateFormats={{
                                                                monthAndYear: "MM/YYYY",
                                                            }}>

                                                                <DesktopDateTimePicker
                                                                    className="td-responesive"
                                                                    format={"YYYY-MM-DD"}
                                                                    readOnly={(dataUser[0].factoryName === 'LVL' && dataUser[0].UserRole !== "Manager" && checkOther === false) ? true : false}
                                                                    // value={selectedDateArr[index]}
                                                                    value={moment(item[key])}
                                                                    onChange={(params) => handleDateTimePickerChange(index, key, params)}
                                                                    views={['year', 'month', 'day']}
                                                                    slotProps={{
                                                                        toolbar: {
                                                                            hidden: true,
                                                                        },
                                                                        textField: {
                                                                            inputProps: {
                                                                                sx: {
                                                                                    height: "0.5rem",
                                                                                    textAlign: "center",
                                                                                },
                                                                            },

                                                                        },
                                                                    }}
                                                                    sx={{
                                                                        width: '180px',
                                                                        '& .MuiInputBase-input': {
                                                                            fontSize: '15px',
                                                                            '@media screen and (max-width: 1200px)': {
                                                                                fontSize: '15px !important',
                                                                            },
                                                                        },
                                                                    }} />
                                                            </LocalizationProvider>
                                                        )
                                                        :
                                                        (key === "ngay" || key === 'CGDate_Date') && (moment(item["ngay"]).format("YYYY-MM-DD") === "1975-04-30")
                                                            ?
                                                            (<div>Chưa có ngày nhập kho</div>)
                                                            : (key === "ngay" || key === 'CGDate_Date') && (item["ngay"] === "1945-02-09")
                                                                ? (<div>Kiểm tra lại số lượng về</div>)
                                                                :
                                                                (
                                                                    item[key]
                                                                )
                                                }
                                            </TableCell>
                                        );
                                    }
                                    else {
                                        return null;
                                    }
                                    return null;
                                })}A
                            </TableRow>
                        )

                    })}

                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableDateTimePicker
