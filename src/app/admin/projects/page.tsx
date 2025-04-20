"use client"
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

function Work() {
  const router = useRouter();
  return (
    <div>
      <div className='flex justify-between items-center px-5 py-3'>
        <h1 className='text-xl font-semibold'>My Projects</h1>
        <Button onClick={()=>router.push("/admin/projects/add-new")}><Plus/> Add New</Button>
      </div>
    </div>
  )
}

export default Work