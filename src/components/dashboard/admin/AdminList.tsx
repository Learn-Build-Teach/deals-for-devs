import { AdminUser } from '@prisma/client'
import DeleteButton from './DeleteButton'
import SubscribeForm from '@/components/forms/SubscribeForm'

interface AdminsProps {
  admins: AdminUser[]
}

export default function AdminUserList({ admins }: AdminsProps) {
  return (
    <ul className="grid w-full gap-2 gap-y-4">
      {admins.map((admin) => (
        <li
          key={admin.email + admin.xata_id}
          className="flex items-center gap-x-4"
        >
          {admin.email}
          <DeleteButton id={admin.xata_id} />
        </li>
      ))}
    </ul>
  )
}
