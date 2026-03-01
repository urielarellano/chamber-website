'use client'
import React, { useEffect, useState } from 'react'
import BookForm from './BookForm';
import BookingTimes from './BookingTimes';


export default function BookButton() {
    const [isOpen, setIsOpen] = useState(false);
    
    // preventn background scroll when booking modal is open
    useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    }, [isOpen]);

    // open modal
    const bookLocation = () => {
    setIsOpen(true);
    };
    // close modal
    const closeModal = () => {
    setIsOpen(false);
    };
  return (
    <>
    {isOpen && (
        <div className="modal-container" onClick={closeModal}> {/* clicking bg closes */}
            <div className="modal" onClick={(e) => e.stopPropagation()}> {/* prevent bg click */}
                <button onClick={closeModal} className="close-modal">
                    Close
                </button>
                {/* put in Lake location_id for now */}
                <BookingTimes location_id={'98a53fdc-e33a-479c-96a2-3f63ce7cf729'}/>
            </div>
        </div>
        )}

        <div className='flex flex-col items-center gap-2 text-center'>
            <b>Book the Mendota Lake, Civic Center, and More!</b>
            <div onClick={bookLocation}
                className='p-8 pt-4 pb-4 w-fit rounded bg-blue-600 text-white cursor-pointer hover:bg-blue-500'>
                Book Location!
            </div>
        </div>
    </>
  )
}
