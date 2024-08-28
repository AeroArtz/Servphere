'use server'

import { auth } from '@/auth';
import { User } from "../../models/userModel";
import { Store } from "../../models/storeModel";

import { connectDB } from "../utils/connect";
import { revalidatePath } from 'next/cache';

export async function ChangeProfilePhoto(formData) {
    const session = await auth();
    const email = session.user?.email;
    const profileImg = formData.get("profileImg");

    console.log(profileImg)

     // CONNECT DB
     await connectDB();
 
     await Store.updateOne({ownerEmail: email},{
        $set : {        
          img: profileImg
        }
     });


     revalidatePath('/mystore')

}
