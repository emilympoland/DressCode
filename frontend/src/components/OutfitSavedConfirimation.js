'use client'; // Add this directive to make the component a Client Component

import PillButton from "./PillButton";

export default function OutfitSavedConfirmation() {
    return (
        <div className="flex flex-col items-center p-10">
            <img src={"/check.png"} alt="check" className="w-1/2 h-auto object-cover rounded-md mb-4" />
            <h1 className="font-bricolage font-extralight text-[22px] text-black text-center mb-4">
                This outfit has been saved to your closet.
            </h1>
            <PillButton text="return to home" onClick={() => { console.log('Next button clicked'); }} bgColor={'bg-[#EF6A3F]'} textColor={'text-[#F9F4E7]'}/>
        </div>
    );
}