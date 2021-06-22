import React from "react";
import RetailManagerRegisterForm from "./RetailManagerRegisterForm";

const RetailManagerRegisterPage = () => {
    return (
        <div className="retail-manager-registration">
            <div>
                <RetailManagerRegisterForm onComplete={() => { history.push("/") }} />
            </div>
        </div>
    );
};

export default RetailManagerRegisterPage;
