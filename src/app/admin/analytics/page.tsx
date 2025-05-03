'use client'

import { Separator } from '@/components/ui/separator'
import { useApp } from '@/stores/useApp'
import { ChartBar, Eye, MousePointerClick } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatDistanceToNow } from 'date-fns'
import { useRouter } from 'next/navigation'

function Analytics() {
  const { user } = useApp()
  const router = useRouter();
  if (!user) return null

  const socialClicks = user.socialLinks.map((link) => ({
    platform: link.platform,
    clicks: link.clicks,
  }))

  const totalProfileViews = user.views.length

  const projectClicks = user.projects.map((project) => ({
    name: project.name,
    clicks: project.clicks,
  }))

  return (
    <div className="p-4 min-h-screen space-y-6">
      <div className="flex justify-between items-center px-2">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <ChartBar className="h-6 w-6" />
          Analytics
        </h1>
      </div>

      <Separator />

      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Eye className="w-4 h-4" />
              Profile Views
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {totalProfileViews}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MousePointerClick className="w-4 h-4" />
              Total Project Clicks
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {projectClicks.reduce((acc, p) => acc + p.clicks, 0)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MousePointerClick className="w-4 h-4" />
              Total Social Clicks
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {socialClicks.reduce((acc, p) => acc + p.clicks, 0)}
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Social Platform Clicks</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={socialClicks}>
                <XAxis dataKey="platform" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="clicks" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Project Clicks</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectClicks}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="clicks" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>


      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Profile Views</CardTitle>
        </CardHeader>
        <CardContent className="overflow-auto">
          {user.views.length === 0 ? (
            <p className="text-sm text-muted-foreground">No views yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Pronouns</TableHead>
                  <TableHead>Viewed At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {user.views.map((view) => (
                  <TableRow key={view.id} className='cursor-pointer' onClick={()=>router.push(`/${view?.viewer?.username}`)}>
                    <TableCell>{view.viewer?.username || "Anonymous"}</TableCell>
                    <TableCell>{view.viewer?.email || "N/A"}</TableCell>
                    <TableCell>{view.viewer?.pronouns || "N/A"}</TableCell>
                    <TableCell>
                      {formatDistanceToNow(new Date(view.viewedAt), { addSuffix: true })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Analytics