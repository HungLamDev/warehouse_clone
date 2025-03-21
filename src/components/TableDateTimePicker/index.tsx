import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    Checkbox,
    TextField,
} from "@mui/material";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { DateTimePicker, DesktopDateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextFieldChangeArrayRowDowns, DateTimePickerChangeArrayRowDowns } from "../../redux/ArrayRowDowns";
import Decimal from "decimal.js";
import axios from "axios";
import { connect_string } from "../../screens/LoginScreen/ChooseFactory";

interface TableDateTimePickerProps {
    columns: GridColDef[];
    rows: GridRowsProp;
    handlerowClick?: any,
    onDoubleClick?: any,
    arrEditCell?: string[],
    listChx?: (rows: GridRowsProp) => void,
    arrNotShowCell?: string[],
    tableName?: string,
    checkOrderNo?:boolean
    checkOther?:boolean
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

    useEffect(() => {
        if (tableName === 'delivery-material') {
            setSelected(MaterialTableChecked)

        }
        if (tableName === "stockout-detail") {
            setSelected(StockoutDetailChecked)
        }
        // else {
        //   setSelected([])
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [MaterialTableChecked, StockoutDetailChecked])

    const handleOnChangeArrivalQty = (rowInd: number, colName: string, value: string, dataRow: any) => {
        const url = connect_string + "api/text_change_qty_print"
        const data =
        {
            MaterialNo: dataRow?.CLBH_Material_No,
            OrderNo: dataRow?.CGNO_Order_No,
            Qty: value,
        }
        axios.post(url, data).then((res: any) => {
           
            dispatch(DateTimePickerChangeArrayRowDowns({ _id: rowInd, columnName: 'ngay', value: moment(res.data).format("YYYY-MM-DD") }))
        })

    }

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelected(rows);
            listChx !== undefined ? listChx(rows) : [];
            return;
        }
        setSelected([]);
        listChx !== undefined ? listChx([]) : [];
    };


    const handleClick = (event: React.MouseEvent<unknown>, item: any) => {
        let newSelected: any[] = [];
        const foundObj1 = selected.find((obj: any) => obj._id === item._id);
        if (foundObj1 === undefined) {
            newSelected = newSelected.concat(selected, item)
        }
        else {
            newSelected = selected.filter((item1: any) => item1._id !== item._id)
        }
        setSelected(newSelected)
        listChx !== undefined ? listChx(newSelected) : [];
    };

    const isSelected = (id: number) => selected.findIndex((item: any) => item._id === id) !== -1;

    const [keyDoubleClick, setKeyDoubleClick] = useState('')

    const handleRowClick = (params: any, item: any) => {
        if (arrEditCell !== undefined && arrEditCell.includes(params)) {
            if (editingCellId !== item._id) {
                setEditingCellId(item._id);
                setSelectedColumn(params);
            }
            if (params !== 'Arrival_QTY') {
                const column_target = item
                if (column_target) {
                    const qty_roll = new Decimal(column_target.qty_roll);
                    const Arrival_QTY = new Decimal(column_target.Arrival_QTY);
                    const result = new Decimal(Arrival_QTY).plus(0.9).toNumber();
                    if (!isNaN(Arrival_QTY.toNumber()) && (qty_roll.toNumber() > result)) {
                        dispatch(TextFieldChangeArrayRowDowns({ _id: column_target._id, columnName: 'qty_roll', value: String(Arrival_QTY) }));
                    }
                }
            }
        }
        else {
            if (keyDoubleClick === item._id && typeof onDoubleClick === "function") {
                onDoubleClick(params, item);
                setKeyDoubleClick("");
            }
            else {

                if (typeof handlerowClick === "function") {
                    handlerowClick(params, item);
                }
                setKeyDoubleClick(item._id);
            }
            setEditingCellId(null);
        }
    };

    const handleCellBlur = (event: React.FocusEvent<HTMLDivElement>, id: number) => {
        setEditingCellId(null);
    };

    const handleOnBlurTextField = (rowInd: number, colName: string, value: string, dataRow: any) => {
        if (colName === "Arrival_QTY" && checkOrderNo === true && dataUser[0].factoryName === "LVL" && dataUser[0].UserRole !== "Manager" && checkOther == false) {
            handleOnChangeArrivalQty(rowInd, colName, value, dataRow)
        }

    }

    const handleTextFieldChange = (rowInd: number, colName: string, value: string) => {
        dispatch(TextFieldChangeArrayRowDowns({ _id: rowInd, columnName: colName, value: value }));
    };

    const handleDateTimePickerChange = (rowInd: number, colName: string, params: any) => {
        if (colName === 'ywsm_Production') {
            dispatch(DateTimePickerChangeArrayRowDowns({ _id: rowInd, columnName: colName, value: moment(params, "MMMM-YYYY").format("MMM-YYYY") }))
            
        }
        else if (colName === 'ngay' || colName === 'CGDate_Date') {
            dispatch(DateTimePickerChangeArrayRowDowns({ _id: rowInd, columnName: colName, value: moment(params).format("YYYY-MM-DD") }))
        }
    };
    return (
        <TableContainer sx={{ height: '100%' }} >
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
                                inputProps={{ "aria-label": "select all desserts" }}
                            />
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
                <TableBody
                    sx={{
                        overflow: "scroll",
                        "& td": {
                            whiteSpace: "pre",
                        },
                    }}
                >
                    {rows.map((item: any, index: number) => {
                        return (
                            <TableRow
                                key={index}
                                hover
                                sx={{
                                    backgroundColor:
                                        item._id === selectedRow ? "#415a77" : "inherit",
                                    cursor: "pointer",
                                }}
                            >
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
                                                                    readOnly={(dataUser[0].factoryName === 'LVL' && dataUser[0].UserRole !== "Manager" && checkOther === false)  ? true : false}
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
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableDateTimePicker;