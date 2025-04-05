import React from "react";
import TableOrigin from "../TableOrigin";

interface EditableTableOriginProps {
    columns: any[];
    rows: any[];
    dataSelected?: string[];
    onRowUpdate: (rowIndex: number, colName: string, value: string) => void;
}

const EditableTableOrigin = ({ columns, rows, dataSelected, onRowUpdate }: EditableTableOriginProps) => {
    const wrappedColumns = columns.map((col) => {
        if (col.selected && typeof col.selected === "object") {
            return {
                ...col,
                selected: {
                    ...col.selected,
                    handle: (value: any, rowId: string) => {
                        const rowIndex = rows.findIndex((r) => r._id === rowId);
                        if (rowIndex !== -1) {
                            onRowUpdate(rowIndex, col.field, value);
                        }
                    },
                },
            };
        }

        return col; 
    });

    return (
        <TableOrigin
            columns={wrappedColumns}
            rows={rows}
            arrNotShowCell={[]}
            handleDoubleClick={null}
            handlerowClick={null}
            dataSelected={dataSelected}
        />
    );
};

export default EditableTableOrigin;
