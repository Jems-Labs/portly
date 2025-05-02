'use client';

import CertificationCard from '@/components/CertificationCard';
import EducationCard from '@/components/EducationCard';
import ExperienceCard from '@/components/ExperienceCard';
import ProjectCard from '@/components/ProjectCard';
import VolunteeringCard from '@/components/VolunteeringCard';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { projectType } from '@/lib/types';
import { platforms } from '@/lib/utils';
import { useApp } from '@/stores/useApp';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';

function UserProfile() {
    const { username } = useParams();
    const { getUser } = useApp();
    const queryClient = useQueryClient();

    const { data: user } = useQuery({
        queryKey: ["user", username],
        queryFn: async () => {
            const res = await getUser(username as string);
            return res;
        },
        staleTime: 1000 * 60 * 5,
        placeholderData: () => queryClient.getQueryData(["user", username]),
    });

    const [activeTab, setActiveTab] = useState('work'); // Active tab state

    return (
        <div className="px-4 py-6 max-w-5xl mx-auto">
            <div className="flex flex-col items-center space-y-4 rounded-2xl px-6 py-4">
                <div className="rounded-full border-2 border-yellow-500 overflow-hidden w-24 h-24 md:w-32 md:h-32">
                    <Image
                        src={user?.image?.url || "/user_ph.png"}
                        alt="user-img"
                        width={128}
                        height={128}
                        className="object-cover w-full h-full"
                        priority
                    />
                </div>
                <div className="text-center flex flex-col">
                    <h2 className="text-xl font-semibold text-white drop-shadow-md">
                        {user?.firstName} {user?.lastName}
                    </h2>
                    <p className="text-sm text-gray-400 font-mono">@{user?.username}</p>
                    <span className="text-base font-medium mt-1">{user?.bio}</span>
                    <div className="flex flex-wrap justify-center items-center gap-3 mt-3">
                        {user?.socialLinks?.map((link) => {
                            const platform = platforms.find(p => p.key === link.platform);
                            if (!platform) return null;
                            return (
                                <a
                                    key={link.platform}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="border p-1 rounded-lg"
                                >
                                    <Image
                                        src={platform.svg}
                                        alt={platform.name}
                                        width={26}
                                        height={26}
                                        className="object-contain"
                                    />
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="w-full mt-5">
                <div className="flex justify-center gap-8">
                    <div
                        onClick={() => setActiveTab('work')}
                        className={`cursor-pointer text-xl font-semibold py-2 px-0 transition-all duration-300 
            ${activeTab === 'work' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'hover:text-yellow-400'}`}
                    >
                        Work
                    </div>
                    <div
                        onClick={() => setActiveTab('resume')}
                        className={`cursor-pointer text-xl font-semibold py-2 px-0 transition-all duration-300 
            ${activeTab === 'resume' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'hover:text-yellow-400'}`}
                    >
                        Resume
                    </div>
                </div>
                <Separator />

                {activeTab === 'work' && (
                    <div>
                        <div className="mt-10">
                            <Label className="text-xl">Skills</Label>
                            {user?.skills?.length ? (
                                <div className="grid grid-cols-12 gap-2 mt-4">
                                    {user?.skills.map((skill, index) => {
                                        return (
                                            <Badge key={index}>{skill.name}</Badge>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center text-muted-foreground mt-10">
                                    No skills found.
                                </div>
                            )}
                        </div>
                        <div className="mt-10">
                            <Label className="text-xl">Projects</Label>
                            {user?.projects?.length ? (
                                <div className="grid grid-cols-1 gap-6 mt-4">
                                    {user.projects.map((project: projectType) => (
                                        <ProjectCard key={project.id} project={project} isDelete={false} isEdit={false} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center text-muted-foreground mt-10">
                                    No projects found.
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'resume' && (
                    <div className="space-y-8 mt-4">
                        {user?.workExperience && user?.workExperience?.length > 0 && (
                            <div className='mt-10'>
                                <Label className="text-xl">Work Experience</Label>
                                <div className="grid grid-cols-1 gap-3 mt-4">
                                    {user.workExperience
                                        .slice()
                                        .sort((a, b) => {
                                            if (Number(b.fromYear) !== Number(a.fromYear)) {
                                                return Number(b.fromYear) - Number(a.fromYear);
                                            }
                                            const monthOrder: Record<string, number> = {
                                                January: 1, February: 2, March: 3, April: 4,
                                                May: 5, June: 6, July: 7, August: 8,
                                                September: 9, October: 10, November: 11, December: 12,
                                            };
                                            return (monthOrder[b.fromMonth] || 0) - (monthOrder[a.fromMonth] || 0);
                                        })
                                        .map((experience, index) => (
                                            <ExperienceCard key={index} experience={experience} isDelete={false} isEdit={false} />
                                        ))}
                                </div>
                            </div>
                        )}

                        {user?.volunteerExperience && user?.volunteerExperience?.length > 0 && (
                            <div className='mt-10'>
                                <Label className="text-xl">Volunteering Experience</Label>
                                <div className="grid grid-cols-1 gap-3 mt-4">
                                    {user.volunteerExperience.map((experience, index) => (
                                        <VolunteeringCard
                                            key={index}
                                            experience={experience}
                                            isDelete={false}
                                            isEdit={false}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {user?.certifications && user?.certifications?.length > 0 && (
                            <div className='mt-10'>
                                <Label className="text-xl">Certifications</Label>
                                <div className="grid grid-cols-1 gap-3 mt-4">
                                    {user.certifications.map((certificate, index) => (
                                        <CertificationCard
                                            key={index}
                                            certificate={certificate}
                                            isEdit={false}
                                            isDelete={false}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                        {user?.education && user?.education?.length > 0 && (
                            <div className='mt-10'>
                                <Label className="text-xl">Education</Label>
                                <div className="grid grid-cols-1 gap-3 mt-4">
                                    {user.education
                                        .slice()
                                        .sort((a, b) => Number(b.startDate) - Number(a.startDate))
                                        .map((education, index) => (
                                            <EducationCard key={index} education={education} isDelete={false} isEdit={false} />
                                        ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserProfile;
