"use client";

import { useEffect, useState } from "react";

export default function Report({
  params,
}: {
  params: { reportid: string; userid: string };
}) {
  const [error, setError] = useState<undefined | string>(undefined);

  useEffect(() => {
    async function getParams() {
      try {
        const report_id = (await params).reportid;
        getReport(report_id);
      } catch (err) {
        console.log(err);
        setError("something went wrong");
      }
    }

    getParams();
  }, []);

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
        setError(data.error);
        return;
      }
      const data = await response.json();
      console.log(data);
    } catch (err) {
      setError("something went wrong");
    }
  }

  {
    error && <div>{error}</div>;
  }
}
