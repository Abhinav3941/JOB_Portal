import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/Badge'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';
import { useSelector } from 'react-redux';

const AppliedJobtbl = () => {

 const {allAppliedJobs} = useSelector(store=>store.job);
  return (
    <div>
          <Table>

            <TableCaption>
                list of applied jobs
            </TableCaption>

            <TableHeader>
                <TableRow>

                    <TableHead>
                        DATE
                    </TableHead>

                    <TableHead>
                        job role
                    </TableHead>

                    <TableHead>
                        Company
                    </TableHead>

                    <TableHead className="text-right">
                        Status
                    </TableHead>
                </TableRow>
                </TableHeader> 


                <TableBody>
                    {
                    allAppliedJobs.length <= 0 ? <span>You haven't applied any job yet.</span> : allAppliedJobs.map((appliedJob) => (
                        <TableRow key={appliedJob._id}>
                        <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                        <TableCell>{appliedJob.job?.title}</TableCell>
                        <TableCell>{appliedJob.job?.company?.name}</TableCell>
                        <TableCell className="text-right"><Badge className={`${appliedJob?.status === "rejected" ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>{appliedJob.status.toUpperCase()}</Badge></TableCell>
                    </TableRow>
                    ))
}
                </TableBody>
          </Table>
    </div>
  )
}

export default AppliedJobtbl
