import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const CompaniesTable = () => {



    const { companies , searchCompanyByText} = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
  
    const navigate = useNavigate();
    useEffect(()=>{
        const filteredCompany = companies.length >= 0 && companies.filter((company)=>{
            if(!searchCompanyByText){
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

        });
        setFilterCompany(filteredCompany);
    },[companies,searchCompanyByText])


    return (
        <div>





            <Table>
                <TableCaption>A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {
    
                                
                                       filterCompany?.map((company) => {
                                        return (
                                            <TableRow key={company._id}> {/* Changed div to TableRow for semantic structure */}
                                            <TableCell>
                                                <div className="flex items-center space-x-4"> {/* Added flex container for spacing */}
                                                    <Avatar className="w-12 h-12"> {/* Adjusted size of Avatar */}
                                                        <AvatarImage src={company.logo} alt={`${company.name} Logo`} />
                                                    </Avatar>
                                                </div>
                                            </TableCell>
                                            <TableCell>{company.name}</TableCell>
                                            <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                            <TableCell className="text-right cursor-pointer">
                                                <Popover>
                                                    <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                                    <PopoverContent className="w-32">
                                                        <div onClick={()=>navigate(`/admin/companies/${company._id}`)}
                                                            className="flex items-center gap-2 w-fit cursor-pointer">
                                                            <Edit2 className="w-4" />
                                                            <span>Edit</span>
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
                                            </TableCell>
                                        </TableRow>
                                        )
                                    })
                                
                        

                        
                    }
















                    {/* {
                        filterCompany?.map((company) => (
                            <tr>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={company.logo}/>
                                    </Avatar>
                                </TableCell>
                                <TableCell>{company.name}</TableCell>
                                <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div onClick={()=> navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>

                        ))
                    } */}
                </TableBody>
            </Table>

        </div>
    )
}

export default CompaniesTable
