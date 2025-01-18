"use client";
import ReportPage from "@/components/ReportPage";
import { useEffect, useState } from "react";

export default function Chat({ params }: { params: { reportid: string } }) {
  const [report, setReport] = useState<any>();

  useEffect(() => {
    async function getParams() {
      try {
        const report_id = (await params).reportid;
        getReport(report_id);
      } catch (err) {
        console.log(err);
      }
    }
    getParams();

    async function getReport(report_id: string) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/report/${report_id}`,
          {
            credentials: "include",
          },
        );
        if (!response.ok) {
          const data = await response.json();
          console.log(data);
          return;
        }
        const data = await response.json();
        setReport(data);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  return <ReportPage></ReportPage>;
}
