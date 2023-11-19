import Layout from "@/components/Shop/Layout";
import { Suspense } from "react";

const example_custom_page = {
    title: "Example Custom Page",
    description: "This is an example custom page.",
    content: "<h1>UwU</h1>"
}

export async function generateMetadata() {
    return {
        title: example_custom_page.title,
        description: example_custom_page.description,
    }
}

export default async function CustomPage() {
    return (
        <Layout>
            <div className="flex items-center gap-2 text-3xl text-third">
                <h1 className="text-white">{example_custom_page.title}</h1>
            </div>
            <Suspense>
            </Suspense>
        </Layout>
    )
}