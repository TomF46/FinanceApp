import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingMessage from "../../../DisplayComponents/LoadingMessage";
import { getSalesData } from "../../../../api/productsApi";
import ProductSalesTableWithPagination from "../../../DisplayComponents/ProductSalesTableWithPagination";
import { getPageWithPaginationUrl } from "../../../../api/paginationApi";

const SalesOverviewPage = () => {
    const [salesData, setSalesData] = useState(null);

    useEffect(() => {
        if (!salesData) {
            findSalesData();
        }
    }, [salesData])

    function findSalesData(){
        getSalesData().then(data => {
            setSalesData(data);
        }).catch(error => {
            toast.error("Error getting sales data " + error.message, {
                autoClose: false,
            });
        });
    }

    function handlePageChange(url){
        getPageWithPaginationUrl(url).then(data => {
            setSalesData(data);
        }).catch(error => {
            toast.error("Error getting sales data " + error.message, {
                autoClose: false,
            });
        });
    }


    return (
        <div className="headoffice-salesoverview">
            <h1 className="text-center font-bold text-4xl">
                Sales overview
            </h1>
            {!salesData ? (
                <LoadingMessage message={"Loading sales Overview"} />
            ) : (
                <ProductSalesTableWithPagination paginationData={salesData} onPageChange={handlePageChange} />
            )
            }
        </div >
    );
};

export default SalesOverviewPage;