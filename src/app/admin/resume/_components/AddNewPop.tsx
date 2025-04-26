import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import {  ChevronDown, Plus } from 'lucide-react'
import Link from 'next/link'

function AddNewPop() {
  return (
    <Popover>
                    <PopoverTrigger asChild>
                        <Button className="text-sm py-2 px-4">
                            <ChevronDown />  Add New
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className='p-2 w-52'>
                        <ul className='flex flex-col gap-2'>
                            <Link className='flex items-center gap-4 hover:bg-[#222222] p-2 cursor-pointer rounded-md' href={'/admin/resume/add-experience'}>
                                <div className='border rounded-full p-1'>


                                    <Plus size={14} />
                                </div>
                                <p>Experience</p>
                            </Link>
                            <Link className='flex items-center gap-4 hover:bg-[#222222] p-2 cursor-pointer rounded-md' href={'/admin/resume/add-education'}>
                                <div className='border rounded-full p-1'>


                                    <Plus size={14} />
                                </div>
                                <p>Education</p>
                            </Link>
                            <Link className='flex items-center gap-4 hover:bg-[#222222] p-2 cursor-pointer rounded-md' href={'/admin/resume/add-certification'}>
                                <div className='border rounded-full p-1'>


                                    <Plus size={14} />
                                </div>
                                <p>Certification</p>
                            </Link>
                            <Link className='flex items-center gap-4 hover:bg-[#222222] p-2 cursor-pointer rounded-md' href={'/admin/resume/add-volunteering'}>
                                <div className='border rounded-full p-1'>


                                    <Plus size={14} />
                                </div>
                                <p>Volunteering</p>
                            </Link>
                        </ul>
                    </PopoverContent>
                </Popover>
  )
}

export default AddNewPop