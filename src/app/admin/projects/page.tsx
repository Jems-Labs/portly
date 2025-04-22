"use client"

import ProjectCard from '@/components/ProjectCard'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { projectType } from '@/lib/types'
import { useApp } from '@/stores/useApp'
import { FolderClosed, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

function Projects() {
  const router = useRouter();
  const { user } = useApp();

  return (
    <div className="p-6 min-h-screen">
      <div className='flex justify-between items-center px-5 py-3'>
        <h1 className='text-2xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2'>
          <FolderClosed /> My Projects
        </h1>
        <Button onClick={() => router.push("/admin/projects/add-new")} className="text-sm py-2 px-4">
          <Plus size={16} /> Add New
        </Button>
      </div>
      <Separator />

      <div className="mt-6">
        {user?.projects?.length ? (
          <div className="grid grid-cols-1 gap-6">
            {user.projects.map((project: projectType) => (
              <div key={project.id}>
                <ProjectCard project={project} isDelete={true} isEdit={true}/>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground mt-10">
            No projects found.
          </div>
        )}
      </div>
    </div>
  )
}

export default Projects