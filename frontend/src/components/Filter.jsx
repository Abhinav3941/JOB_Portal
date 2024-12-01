import { Label } from './ui/label'
import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'



const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: [ "Frontend Devloper",
            "Backend Developer",
            "Full Stack Developer",
            "Data Scientist",
            "Graphic Designer",
            "Software Engineer"
        ]
    },
    {
        filterType: "Salary",
        array: ["1 LPA - 5 LPA", "5 LPA - 10 LPA", "10 LPA - 50 LPA"]
    },
]

const Filter = () => {


    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    useEffect(()=>{
  
        dispatch(setSearchedQuery(selectedValue));
    },[selectedValue]);
  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg'>Filter</h1>
 <hr className='mt-3'></hr>

 <RadioGroup  value={selectedValue} onValueChange={changeHandler}>
                {
                    filterData.map((data, index) => (
                        <div>
                            <h1 className='font-bold text-lg'>{data.filterType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem value={item} id={itemId}  />
                                            <Label htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>



    </div>
  )
}

export default Filter
