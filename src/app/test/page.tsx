'use client';

import { useEffect } from 'react'; // Import useEffect
import supabase from "@/utils/SupabaseConfig";
import { Button } from '@/components/ui/button';

async function fetchData(){
    // It's good practice to log when the fetch starts to trace its execution
    console.log('Attempting to fetch data from asset_template...');
    try {
        const { data: asset_template, error } = await supabase
        .from('asset_templates')
        .select('*')

        if(error){
            console.error('Supabase error fetching asset_template:', error); // Use console.error for errors
        }else{
            console.log('Successfully fetched asset_template:', asset_template);
        }
    } catch (e) {
        // Catch any unexpected errors during the async operation itself
        console.error('Unexpected error in fetchData:', e);
    }
}


function PageTest(){
    useEffect(() => {
        // This function will now only be called once after the component initially mounts
        fetchData();
    }, []); // The empty dependency array [] ensures this effect runs only on mount and unmount

    return(
        <div>
            <h1>Test</h1>
        </div>
    )
}

export default PageTest;
