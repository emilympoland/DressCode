'use client';

import { useRouter } from 'next/navigation';
import PillButton from "./PillButton";

export default function OutfitSavedConfirmation({ outfitItemIds, username, profilePicUrl }) {
    const router = useRouter(); // Initialize the router

    const handleReturnToHome = async () => {
        try {
            // Construct the Post object
            const post = {
                poster_username: username, // The username of the poster
                caption: "Check out my new outfit!", // Example caption
                outfit_item_ids: outfitItemIds, // IDs of the clothing items in the outfit
                profile_pic_url: profilePicUrl, // Optional profile picture URL
            };

            console.log('Post object to be sent:', post);

            // Make a POST request to create a feed post
            const response = await fetch('http://localhost:8000/api/feed/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies for authentication
                body: JSON.stringify(post), // Send the Post object as JSON
            });

            if (!response.ok) {
                throw new Error('Failed to create post on the feed');
            }

            // Navigate to the Explore page after successfully creating the post
            router.push('/explore');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div className="flex flex-col items-center p-10">
            <img src={"/check.png"} alt="check" className="w-1/2 h-auto object-cover rounded-md mb-4" />
            <h1 className="font-bricolage font-extralight text-[22px] text-black text-center mb-4">
                This outfit has been saved to your closet.
            </h1>
            <PillButton 
                text="return to home" 
                onClick={handleReturnToHome} // Call the function to create the post and navigate
                bgColor={'bg-[#EF6A3F]'} 
                textColor={'text-[#F9F4E7]'}
            />
        </div>
    );
}