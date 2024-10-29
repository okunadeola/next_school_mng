"use client"

import { createAttendance } from "@/lib/actions";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

const MarkAttendance = ({userId}:{userId:string | null}) => {

    const [state, formAction] = useFormState( createAttendance,
        {
          success: false,
          error: false,
        }
      );

    
      useEffect(() => {
        if (state.success) {
          toast(`attendance has been created!`);
        }
      }, [state]);



    const onSubmit = () => {
        const json = {
          studentId: userId!,
          date: new Date(),
          present: true,
          lessonId: 9,
        }
        formAction(json);
          };


  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
    <button className=" outline-none ring-1 bg-lamaPurpleLight rounded border-none shadow px-2 py-1 text-default-300" onClick={onSubmit}>
      Mark Attendance
    </button>
  </div>
  )
}

export default MarkAttendance
