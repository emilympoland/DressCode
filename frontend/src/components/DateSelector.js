'use client';
import '../app/globals.css';
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateSelector({ item, onBack, onConfirm }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#EB6D39] w-[90%] max-w-md mx-auto mt-6">
      <h2 className="text-white text-lg mb-4 font-semibold text-center">
        Select Date Range to Borrow Item
      </h2>

      <div className="bg-white rounded-2xl p-4 mb-4">
        <DatePicker
          selected={startDate}
          onChange={handleChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
        />
      </div>

      <div className="flex gap-4 mt-2">
        <button
          onClick={onBack}
          className="rounded-full bg-[#F9F4E7] text-[#EB6D39] border border-[#EB6D39] hover:bg-gray-100 px-6 py-2 text-sm font-medium"
        >
          Back
        </button>
        <button
          onClick={onConfirm}
          disabled={!startDate || !endDate}
          className={`rounded-full px-6 py-2 text-sm font-medium ${
            !startDate || !endDate
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#96A8FD] text-[#D9F855]"
          }`}
        >
          Send Request
        </button>
      </div>
    </div>
  );
}