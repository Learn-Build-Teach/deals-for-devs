import { Deal } from '@prisma/client'
import { format } from 'date-fns'

export default function AdminDealsList({ deals }: { deals: Deal[] }) {
  return (
    <table className="table-auto text-white">
      <thead>
        <tr>
          <th className="w-64 text-left">Deal Name</th>
          <th className="w-48 text-left">Owner</th>
          <th className="w-36 text-left">Submitted Date</th>
          <th className="w-48 text-left">Review</th>
        </tr>
      </thead>
      <tbody></tbody>
      {deals.map((deal) => (
        <tr key={deal.xata_id}>
          <td>{deal.name}</td>
          <td>{deal.contactName}</td>
          <td>{format(new Date(deal.xata_createdat), 'MMM d')}</td>
          <a
            href={`/admin/dashboard/deals/${deal.xata_id}`}
            className="rounded-md border border-cyan-500 px-4 py-2 text-cyan-500"
          >
            Review Submission
          </a>
        </tr>
      ))}
    </table>
  )
}
