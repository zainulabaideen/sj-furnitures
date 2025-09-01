import { Fragment, useEffect } from "react"; 
import { DataGrid } from "@mui/x-data-grid"; 
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../actions/productAction";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList =  () => { // Removed history prop
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate(); // Added useNavigate hook

  const { 
    products = [], 
    loading = false, 
    error = null,
    isDeleted = false 
  } = useSelector((state) => state.products);

const deleteProductHandler = async (id) => {
  try {
     dispatch(deleteProduct(id));
  } catch (error) {
    alert.error(error.message);
  }
};

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      navigate("/admin/dashboard"); // Changed history.push to navigate
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error, navigate, isDeleted]); 

  const columns = [
    { 
      field: "id", 
      headerName: "Product ID", 
      minWidth: 200, 
      flex: 0.5,
      headerClassName: 'grid-header',
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      headerClassName: 'grid-header',
      cellClassName: (params) => {
        return params.value <= 0 ? "low-stock" : "normal-stock";
      },
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
      headerClassName: 'grid-header',
      renderCell: (params) => {
        return `Rs ${params.value}`;
      },
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      sortable: false,
      headerClassName: 'grid-header',
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/product/${params.row.id}`}>
              <EditIcon style={{ color: '#1976d2', marginRight: '15px' }} />
            </Link>
            <Button 
              onClick={() => deleteProductHandler(params.row.id)}
              style={{ color: '#d32f2f' }}
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = products?.map((item) => ({
    id: item._id,
    stock: item.stock,
    price: item.price,
    name: item.name,
  })) || [];

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />
      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
            loading={loading}
            sx={{
              boxShadow: 2,
              border: 0,
              '& .grid-header': {
                backgroundColor: 'tomato',
                color: 'white',
                fontSize: '1rem',
              },
              '& .low-stock': {
                color: 'red',
                fontWeight: 'bold',
              },
              '& .normal-stock': {
                color: 'green',
              },
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
              },
              '& .MuiDataGrid-columnSeparator': {
                display: 'none',
              },
            }}
            componentsProps={{
              pagination: {
                sx: {
                  '& .MuiTablePagination-displayedRows': {
                    fontSize: '0.875rem',
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;