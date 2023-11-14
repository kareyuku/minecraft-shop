import Sidebar from "@/components/ui/Sidebar";
import { Suspense } from "react";

export default function AdminDashboard() {
    return (
        <Sidebar>
            <h1>loading</h1>
            <Suspense>
                <div>Last Transactions</div>
            </Suspense>
        </Sidebar>
    );
}
