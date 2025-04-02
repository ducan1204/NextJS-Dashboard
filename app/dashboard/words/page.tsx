import { lusitana } from "@/app/ui/fonts";
import { CreateInvoice } from "@/app/ui/invoices/buttons";
import Search from "@/app/ui/search";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import Table from '@/app/ui/invoices/table';
import { fetchInvoicesPages } from "@/app/lib/data";
import Pagination from "@/app/ui/invoices/pagination";
import { Metadata } from "next";
import Quiz from "@/app/ui/words/quiz";

export const metadata: Metadata = {
  title: 'Words'
}

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  return (
    <div className="flex items-center justify-center h-screen">
      <Quiz/>
    </div>
  );
}
