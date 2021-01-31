import MainLayout from "../../components/layout";
import Sidebar from "../../components/user/sidebar";
import React from "react";

const DeliveryAddresses = () => {
    return (
        <MainLayout>
            <section id="dashboard_wrappers">
                <div className="container">
                    <div className="row">
                        <Sidebar/>
                        <div className="col-lg-8 col-md-8 col-sm-12 col-12">

                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}

export default DeliveryAddresses