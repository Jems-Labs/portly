"use client"
import { projectType } from "@/lib/types";
import { ExternalLink, Pencil, Trash, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { useApp } from "@/stores/useApp";

function ProjectCard({ project, isDelete, isEdit }: { project: projectType, isDelete: Boolean, isEdit: Boolean }) {
    const { deleteProject, clickProject } = useApp();

    const handleProjectClick = async (id: string | number, url: string) => {
        await clickProject(id);
        window.open(url, "_blank");
    }
    return (
        <div className="rounded-lg border overflow-hidden bg-[#0D0D0D]">
            <div className="p-5 flex flex-col">
                <div className="flex flex-col md:flex-row justify-between">

                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                        <div className="flex-shrink-0">
                            <Image
                                src={project.logo || "/placeholder.svg"}
                                alt={`${project.name} logo`}
                                width={50}
                                height={50}
                                className="rounded-md border"
                            />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{project.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{project.tagline}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 my-4 md:my-0">
                        <div
                            onClick={()=>handleProjectClick(project.id, project?.projectUrl)}
                            className="text-gray-400 hover:text-white transition-colors duration-200 border px-2 py-1 rounded-md cursor-pointer">
                            <ExternalLink size={20} />
                        </div>

                        <Link
                            href={project.videoUrl}
                            target="_blank"
                            className="text-gray-400 hover:text-white transition-colors duration-200 border px-2 py-1 rounded-md">
                            <Video size={20} />
                        </Link>
                        {isEdit && (
                            <Link
                                href={`/admin/projects/${project.id}`}
                                className="text-gray-400 hover:text-white transition-colors duration-200 border px-2 py-1 rounded-md">
                                <Pencil size={20} />
                            </Link>
                        )}


                        {isDelete && (
                            <div
                                className="text-red-600 hover:text-red-500 transition-colors duration-200 cursor-pointer border px-2 py-1 rounded-md"
                                onClick={() => deleteProject(project.id)}>
                                <Trash size={20} />
                            </div>
                        )}
                    </div>

                </div>

                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 tracking-wide my-2">Built with</p>
                    <div className="flex flex-wrap gap-2">
                        {project.tools.map((tool, index) => (
                            <Badge key={index}>{tool}</Badge>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard;