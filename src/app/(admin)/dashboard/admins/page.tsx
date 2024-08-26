import AdminUserList from '@/components/dashboard/admin/AdminList'
import NewAdminForm from '@/components/dashboard/admin/NewAdminForm'
import { getAllAdminUsers } from '@/queries/adminUsers'

export default async function Subscribers() {
  const admins = await getAllAdminUsers()

  return (
    <section className="px-4 pb-10">
      <h2 className="mb-10 text-center text-5xl text-white">Manage Admins</h2>
      <div className="mb-10">
        <h3 className="mb-10 pt-8 text-center text-lg uppercase">
          Add Admin User
        </h3>
        <NewAdminForm />
      </div>
      <div className="mb-10">
        <h3 className="mb-10 pt-8 text-center text-lg uppercase">
          Admin Users
        </h3>
        <AdminUserList admins={admins} />
      </div>
    </section>
  )
}
