"use client"
import { Separator } from '@/components/ui/separator'

import { Briefcase } from 'lucide-react'
import React from 'react'
import AddNewPop from './_components/AddNewPop'
import { Label } from '@/components/ui/label'
import { useApp } from '@/stores/useApp'
import ExperienceCard from '@/components/ExperienceCard'
import EducationCard from '@/components/EducationCard'
import CertificationCard from '@/components/CertificationCard'
import VolunteeringCard from '@/components/VolunteeringCard'

function Resume() {
    const { user } = useApp();

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
                <div>
                    <Label className='text-xl'>Experience</Label>
                    {user?.workExperience?.length ? (
                        <div className="grid grid-cols-1 gap-3 mt-4">
                            {user.workExperience
                                .slice()
                                .sort((a, b) => {
                                    if (Number(b.fromYear) !== Number(a.fromYear)) {
                                        return Number(b.fromYear) - Number(a.fromYear);
                                    }
                                    const monthOrder: { [key: string]: number } = {
                                        January: 1,
                                        February: 2,
                                        March: 3,
                                        April: 4,
                                        May: 5,
                                        June: 6,
                                        July: 7,
                                        August: 8,
                                        September: 9,
                                        October: 10,
                                        November: 11,
                                        December: 12,
                                    };
                                    return (monthOrder[b.fromMonth] || 0) - (monthOrder[a.fromMonth] || 0);
                                })
                                .map((experience, index) => (
                                    <div key={index}>
                                        <ExperienceCard experience={experience} isDelete={true} isEdit={true} />
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <div className="text-center text-muted-foreground mt-10">
                            No experience found.
                        </div>
                    )}
                </div>
                <div>
                    <Label className='text-xl'>Education</Label>
                    {user?.education?.length ? (
                        <div className="grid grid-cols-1 gap-3 mt-4">
                            {user.education
                                .slice()
                                .sort((a, b) => {
                                    if (Number(b.startDate) !== Number(a.startDate)) {
                                        return Number(b.endDate) - Number(a.endDate);
                                    }
                                    return 0;
                                })
                                .map((education, index) => (
                                    <div key={index}>
                                        <EducationCard education={education} isDelete={true} isEdit={true} />
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <div className="text-center text-muted-foreground mt-10">
                            No education found.
                        </div>
                    )}

                </div>
                <div>
                    <Label className='text-xl'>Certification</Label>
                    {user?.certifications?.length ? (
                        <div className="grid grid-cols-1 gap-3 mt-4">
                            {user.certifications
                                .map((certificate, index) => (
                                    <div key={index}>
                                        <CertificationCard certificate={certificate} isEdit={true} isDelete={true} />
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <div className="text-center text-muted-foreground mt-10">
                            No certificate found.
                        </div>
                    )}
                </div>
                <div>
                    <Label className='text-xl'>Volunteering</Label>
                    {user?.volunteerExperience?.length ? (
                        <div className="grid grid-cols-1 gap-3 mt-4">
                            {user.volunteerExperience
                                .map((experience, index) => (
                                    <div key={index}>
                                        <VolunteeringCard experience={experience} isDelete={true} isEdit={true} />
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <div className="text-center text-muted-foreground mt-10">
                            No volunteer experience found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Resume
