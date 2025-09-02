import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import "./orderList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const OrderList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const navigate = useNavigate();

  // Add default values to prevent destructuring errors
  const { error = null, orders = [] } = useSelector((state) => state.allOrders || {});
  const { error: deleteError = null, isDeleted = false } = useSelector((state) => state.order || {});

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };


  useEffect(() => {
    if (error) {
      if (error == "order.remove is not a function") {
        dispatch(clearErrors());
      } else {
        alert.error(error);
        dispatch(clearErrors());
      }
    }

    if (deleteError) {
      if (deleteError == "order.remove is not a function") {
        dispatch(clearErrors());
      } else {
        alert.error(deleteError);
        dispatch(clearErrors());
      }
    }

    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="orderListContainer">
          <h1 id="orderListHeading">ALL ORDERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="orderListTable"
            autoHeight
            sx={{
              '& .MuiDataGrid-columnHeader': {
                backgroundColor: 'tomato',
                color: 'white',
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: 'bold',
              },
              '& .MuiDataGrid-iconSeparator': {
                display: 'none',
              },
              '& .MuiDataGrid-sortIcon': {
                color: 'white',
              },
              '& .MuiDataGrid-menuIcon': {
                color: 'white',
              },
            }}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;
