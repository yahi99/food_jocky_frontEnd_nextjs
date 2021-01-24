import MainLayout from "../../components/layout";
import React from "react";
import Sidebar from "../../components/user/sidebar";

const User = () => {
    return (
        <MainLayout>
            <section id="dashbords_wrappers">
                <div className="container">
                    <div className="row">
                        <Sidebar/>
                    </div>
                </div>
            </section>

        </MainLayout>
    )
}

export default User