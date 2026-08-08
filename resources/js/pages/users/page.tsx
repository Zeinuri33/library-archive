"use client"

import { Head } from '@inertiajs/react'
import { useState } from "react"
import { DataTable } from "@/components/data-table"
import Heading from '@/components/heading'
import type { User } from "./columns";
import { columns } from "./columns"
import CreateUserModal from "./create"
import EditUserModal from "./edit"

export default function Users({ users }: { users: User[] }) {

  const [openEdit, setOpenEdit] = useState(false)
const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const handleEdit = (user: User) => {
    setSelectedUser(user)
    setOpenEdit(true)
  }

  return (
    <>
      <Head title="Pengguna" />

      <div className="p-6 space-y-4">

        {/* Header */}
        <div className="flex items-center justify-between">
          <Heading
            variant="small"
            title="Data Pengguna"
            description="daftar pengguna sistem."
          />

          <CreateUserModal />
        </div>

        {/* Table */}
        <DataTable 
          columns={columns(handleEdit)} 
          data={users} 
        />

        {/* Modal Edit */}
        {selectedUser && (
        <EditUserModal
          open={openEdit}
          setOpen={setOpenEdit}
          user={selectedUser}
        />
        )}

      </div>
    </>
  )
}

Users.layout = {
  breadcrumbs: [
    {
      title: 'Pengguna',
      href: '/users',
    },
  ],
}