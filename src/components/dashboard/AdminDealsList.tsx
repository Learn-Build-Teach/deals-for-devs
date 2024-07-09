import { Deal } from '@prisma/client'
import { format } from 'date-fns'

export default function AdminDealsList({ deals }: { deals: Deal[] }) {
  return (
    <table className="table-auto text-white">
      <thead>
        <tr>
          <th>Deal Name</th>
          <th>Submitted Date</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody></tbody>
      {deals.map((deal) => (
        <tr key={deal.xata_id}>
          <td>{deal.name}</td>
          <td>{format(new Date(deal.xata_createdat), 'MMM d')}</td>
          <td>{deal.approved ? 'PENDING' : 'APPROVED'}</td>
          <a href={`/admin/dashboard/deals/${deal.xata_id}`}>
            Review Submission
          </a>
        </tr>
      ))}
    </table>
  )
}
