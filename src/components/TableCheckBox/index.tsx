import React from 'react'

const index = () => {
    interface TableCheckBoxProps {
        columns: GridColDef[];
        rows: GridRowsProp;
        handlerowClick?: any,
        onDoubleClick?: any,
        arrEditCell?: string[],
        listChx?: (rows: GridRowsProp) => void,
        arrNotShowCell?: string[],
        tableName?: string,
        dschx?: any[],
        selectedAll?: boolean
      }
    return (
    <div>index</div>
  )
}

export default index