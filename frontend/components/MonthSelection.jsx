"use client"
import React, { useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { CalendarDays } from 'lucide-react'
import { addMonths } from 'date-fns'
import moment from 'moment'
import { Calendar } from "@/components/ui/calendar"

/**
 * Komponen MonthSelection
 * Menangani tampilan dan interaksi untuk pemilihan bulan.
 * 
 * - Menggunakan useState untuk mengelola bulan yang dipilih.
 * - Menampilkan kalender untuk memilih bulan dan tahun.
 * - Mengirimkan bulan yang dipilih ke parent component.
 */

function MonthSelection({ selectedMonth }) {
    const today = new Date();
    const nextMonths = addMonths(today, 0);
    const [month, setMonth] = useState(nextMonths);

    return (
        <div className="w-full md:w-auto">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline"
                        className="flex gap-2 items-center text-slate-500 cursor-pointer w-full md:w-auto">
                        <CalendarDays className='h-5 w-5' />
                        {moment(month).format('MMM yyyy')}
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <Calendar
                        mode="single"
                        month={month}
                        onMonthChange={(value) => { 
                            setMonth(value); 
                            if (typeof selectedMonth === 'function') {
                                selectedMonth(value); 
                            }
                        }}
                        className="flex flex-1 justify-center"
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default MonthSelection