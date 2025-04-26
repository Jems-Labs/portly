"use client"
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import { Briefcase } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import AddNewPop from './_components/AddNewPop'
import { Label } from '@/components/ui/label'
import { useApp } from '@/stores/useApp'

function Resume() {
    const router = useRouter();
    const {user} = useApp();
    console.log(user)
    return (
        <div className="p-6 min-h-screen">
            <div className='flex justify-between items-center px-5 py-3'>
                <h1 className='text-2xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2'>
                    <Briefcase /> My Resume
                </h1>
                <AddNewPop />
            </div>
            <Separator />
            <div className='flex flex-col gap-4 mt-5'>
                <div className='flex items-center justify-between'>
                    <Label className='text-xl'>Experience</Label>
                </div>
                <div className='flex items-center justify-between'>
                    <Label className='text-xl'>Education</Label>
                </div>
                <div className='flex items-center justify-between'>
                    <Label className='text-xl'>Certification</Label>
                </div>
                <div className='flex items-center justify-between'>
                    <Label className='text-xl'>Volunteering</Label>
                </div>
                
            </div>
        </div>
    )
}

export default Resume