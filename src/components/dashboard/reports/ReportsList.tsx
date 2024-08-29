import { Deal, Report } from '@prisma/client'
import Link from 'next/link'

interface ReportsProps {
  reports: Report[]
  deal: Deal
}

export default function ReportsList({ reports, deal }: ReportsProps) {
  return (
    <div className="grid gap-8">
      {reports.map((report) => (
        <div
          key={report.xata_id}
          className="w-full rounded-md bg-gray-800 px-4 py-8 "
        >
          <Link
            href={`/deals/${deal.xata_id}`}
            className=" relative text-white hover:text-teal-500"
            rel="noopener noreferrer"
          ></Link>
          <p className="">Reason: {report.reason}</p>
          <p className="">Email: {report.email}</p>
        </div>
      ))}
    </div>
  )
}
