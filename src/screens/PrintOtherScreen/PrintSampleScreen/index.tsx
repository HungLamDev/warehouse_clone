import { GridColDef } from '@mui/x-data-grid';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FullScreenContainerWithNavBar from '../../../components/FullScreenContainerWithNavBar';
import { Box } from '@mui/material';

const  DataHistoryPrintScreen = ({ data }: { data?: any }) =>  {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //#region column header table
    const columnsUp: GridColDef[] = [
        {
            field: "Supplier",
            headerName: t("dcpSupplier") as string, // Nhà cung ứng
            width: 70,
            headerClassName: "custom-header",
        },
        {
            field: "Material_No",
            headerName: t("dcpMaterial_No") as string, // Mã vật tư
            width: 150,
            headerClassName: "custom-header",
        },
        {
            field: "Material_Name",
            headerName: t("dcpMaterial_Name") as string, // Tên vật tư
            width: 150,
            headerClassName: "custom-header",
        },
        {
            field: "Color",
            headerName: t("dcpColor") as string, // Màu
            width: 110,
            headerClassName: "custom-header",
        },
        {
            field: "Size",
            headerName: "State/Season", // State/Season
            width: 300,
            headerClassName: "custom-header",
        },
        {
            field: "Print_QTY",
            headerName: t("dcpQty_ROLL") as string, //Số lượng cuộn
            width: 160,
            headerClassName: "custom-header",
        },
        {
            field: "QTY",
            headerName: t("dcpQTY_Show") as string, // Số lượng
            width: 160,
            headerClassName: "custom-header",
        },
        {
            field: "dwbh_Units",
            headerName: t("dcpUnit") as string, // Đơn vị
            width: 160,
            headerClassName: "custom-header",
        },
        {
            field: "Order_No",
            headerName: t("dcpOrder_No") as string, // Số phiếu
            width: 160,
            headerClassName: "custom-header",
        },
        {
            field: "Roll",
            headerName: t("dcpRoll") as string, // Cuộn
            width: 160,
            headerClassName: "custom-header",
        },
        {
            field: "Print_Date",
            headerName: t("dcpDate") as string, // Ngày
            width: 160,
            headerClassName: "custom-header",
        },
        {
            field: "Production",
            headerName: t("dcpProduction") as string, // Ngày sản xuất
            width: 160,
            headerClassName: "custom-header",
        },
        {
            field: "Work_Order",
            headerName: "Article", // Article
            width: 160,
            headerClassName: "custom-header",
        },
        {
            field: "Material_Types",
            headerName: t("dcmMaterial_Type") as string, // Loại vật tư
            width: 160,
            headerClassName: "custom-header",
        },
        {
            field: "Barcode",
            headerName: t("dcpBarcode") as string, // Mã QR
            width: 160,
            headerClassName: "custom-header",
        },
        {
            field: "Type_Order",
            headerName: "", // Mã QR
            width: 160,
            headerClassName: "custom-header",
        },
    ];
    const columnsDown: GridColDef[] = [
        {
            field: "CLBH_Material_No",
            headerName: t("dcmMaterial_No") as string, // Mã vật tư
            width: 110,
            headerClassName: "custom-header",
        },
        {
            field: "ywpm_Material",
            headerName: t("dcpMaterial_Name") as string, // Tên vật tư
            width: 300,
            headerClassName: "custom-header",
        },
        {
            field: "Color",
            headerName: t("dcmColor") as string, // Màu
            width: 160,
            headerClassName: "custom-header",
        },
        {
            field: "Size",
            headerName: "Stage/Season", // Stage/Season
            width: 160,
            headerClassName: "custom-header",
        },
        {
            field: "Print_QTY",
            headerName: t("dcpQty_ROLL") as string, // Số lượng cuộn
            width: 160,
            headerClassName: "custom-header",
        },
        {
            field: "Arrial_Qty",
            headerName: t("dcmArrival_QTY") as string, // Số lượng về
            width: 160,
            headerClassName: "custom-header",
        },
        {
            field: "QTY",
            headerName: t("dcpQTY_Show") as string, // Số lượng
            width: 160,
            headerClassName: "custom-header",
        },
        {
            field: "dwbh_Units",
            headerName: t("dcpUnit") as string, // Đơn vị
            width: 160,
            headerClassName: "custom-header",
        },
        {
            field: "CGNO_Order_No",
            headerName: t("dcmOrder_No") as string, // Số phiếu
            width: 160,
            headerClassName: "custom-header",
        },
        {
            field: "Roll",
            headerName: t("dcmRoll") as string, // Cuộn
            width: 160,
            headerClassName: "custom-header",
        },
        {
            field: "CGDate_Date",
            headerName: t("dcpDate") as string, // Ngày
            width: 160,
            headerClassName: "custom-header",
        },
        {
            field: "nhasx",
            headerName: t("dcpProduction") as string, // Ngày sản xuất
            width: 160,
            headerClassName: "custom-header",
        },
        {
            field: "ZLBH_Work_Order",
            headerName: "Article", // Article
            width: 160,
            headerClassName: "custom-header",
        },
        {
            field: "cllb_Material_Type",
            headerName: t("dcmMaterial_Type") as string, // Loại vật tư
            width: 160,
            headerClassName: "custom-header",
        },
        {
            field: "Name_M",
            headerName: "", //Name
            width: 160,
            headerClassName: "custom-header",
        },
        {
            field: "Type_Order",
            headerName: "", //Name
            width: 160,
            headerClassName: "custom-header",
        },
    ];
    const columnsOrderNo: GridColDef[] = [

        {
            field: "CGNO_Order_No",
            headerName: t("dcmOrder_No") as string,
            width: 120,
            headerClassName: "custom-header",
        },
    ];
    const cancelRequest = {

    }
  return (
      <FullScreenContainerWithNavBar sideBarDisable={true}
          sideBarNavigate=""
          title={t("frmPrint_Sample") as string}
          navigate={"/"}
          cancelRequest={cancelRequest}>
            

    </FullScreenContainerWithNavBar>
  )
}

export default DataHistoryPrintScreen