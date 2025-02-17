'use server'

import { auth } from '@/auth';
import { db } from '@/db';
import { services } from '@/db/schema/services';



export async function submitCoachingData(formData) {

    // GET AUTHENTICATED USERS EMAIL 

    
    const session = await auth();
    const email = session.user?.email;

    // THUMNAIL PAGE DATA
 
    const tb_img = formData.get('tb_img');
    const tb_style = formData.get('tb_style');
    const tb_title = formData.get('tb_title');
    const tb_subtitle = formData.get('tb_subtitle');
    const tb_desc = formData.get('tb_desc');

    const tb_buttonCTA = formData.get('tb_buttonCTA');
    const tb_price = formData.get('tb_price');
    const tb_discount = formData.get('tb_discount');



    // AVAILABILITY PAGE DATA
    const av_timezone = formData.get('av_timezone');
    const av_duration = parseInt(formData.get('av_duration'));
    const av_break_before = parseInt(formData.get('av_break_before'));
    const av_break_after = parseInt(formData.get('av_break_after'));
    const av_max_attendees = parseInt(formData.get('av_max_attendees'));

    const Sunday_opening_hour = formData.get('Sunday_opening_hour');
    const Sunday_opening_minute = formData.get('Sunday_opening_minute');
    const Sunday_opening_AM_or_PM = formData.get('Sunday_opening_AM_or_PM');
    const Sunday_closing_hour = formData.get('Sunday_closing_hour');
    const Sunday_closing_minute = formData.get('Sunday_closing_minute');
    const Sunday_closing_AM_or_PM = formData.get('Sunday_closing_AM_or_PM');

    const Monday_opening_hour = formData.get('Monday_opening_hour');
    const Monday_opening_minute = formData.get('Monday_opening_minute');
    const Monday_opening_AM_or_PM = formData.get('Monday_opening_AM_or_PM');
    const Monday_closing_hour = formData.get('Monday_closing_hour');
    const Monday_closing_minute = formData.get('Monday_closing_minute');
    const Monday_closing_AM_or_PM = formData.get('Monday_closing_AM_or_PM');

    const Tuesday_opening_hour = formData.get('Tuesday_opening_hour');
    const Tuesday_opening_minute = formData.get('Tuesday_opening_minute');
    const Tuesday_opening_AM_or_PM = formData.get('Tuesday_opening_AM_or_PM');
    const Tuesday_closing_hour = formData.get('Tuesday_closing_hour');
    const Tuesday_closing_minute = formData.get('Tuesday_closing_minute');
    const Tuesday_closing_AM_or_PM = formData.get('Tuesday_closing_AM_or_PM');

    const Wednesday_opening_hour = formData.get('Wednesday_opening_hour');
    const Wednesday_opening_minute = formData.get('Wednesday_opening_minute');
    const Wednesday_opening_AM_or_PM = formData.get('Wednesday_opening_AM_or_PM');
    const Wednesday_closing_hour = formData.get('Wednesday_closing_hour');
    const Wednesday_closing_minute = formData.get('Wednesday_closing_minute');
    const Wednesday_closing_AM_or_PM = formData.get('Wednesday_closing_AM_or_PM');

    const Thursday_opening_hour = formData.get('Thursday_opening_hour');
    const Thursday_opening_minute = formData.get('Thursday_opening_minute');
    const Thursday_opening_AM_or_PM = formData.get('Thursday_opening_AM_or_PM');
    const Thursday_closing_hour = formData.get('Thursday_closing_hour');
    const Thursday_closing_minute = formData.get('Thursday_closing_minute');
    const Thursday_closing_AM_or_PM = formData.get('Thursday_closing_AM_or_PM');

    const Friday_opening_hour = formData.get('Friday_opening_hour');
    const Friday_opening_minute = formData.get('Friday_opening_minute');
    const Friday_opening_AM_or_PM = formData.get('Friday_opening_AM_or_PM');
    const Friday_closing_hour = formData.get('Friday_closing_hour');
    const Friday_closing_minute = formData.get('Friday_closing_minute');
    const Friday_closing_AM_or_PM = formData.get('Friday_closing_AM_or_PM');

    const Saturday_opening_hour = formData.get('Saturday_opening_hour');
    const Saturday_opening_minute = formData.get('Saturday_opening_minute');
    const Saturday_opening_AM_or_PM = formData.get('Saturday_opening_AM_or_PM');
    const Saturday_closing_hour = formData.get('Saturday_closing_hour');
    const Saturday_closing_minute = formData.get('Saturday_closing_minute');
    const Saturday_closing_AM_or_PM = formData.get('Saturday_closing_AM_or_PM');

    const store_id = formData.get("store_id");

    console.log(`id : ${store_id}`)

    await db.insert(services).values({
        store_id : store_id,
        label : "coaching",
        thumbnail: {
            style: tb_style,
            img: tb_img,
            title: tb_title,
            subtitle: tb_subtitle,
            description: tb_desc,
            buttonCTA: tb_buttonCTA ,
            price : tb_price,
            discount : tb_discount
            
        },

        availability: {
            timezone : av_timezone,
            duration: av_duration,
            breakBefore : av_break_before,
            breakAfter: av_break_after,
            max_attendees : av_max_attendees,
            timings:[
                  { day: 'Sunday',
                    opening_hour : Sunday_opening_hour,
                    opening_minute : Sunday_opening_minute,
                    opening_AM_or_PM : Sunday_opening_AM_or_PM,
                    closing_hour : Sunday_closing_hour,
                    closing_minute: Sunday_closing_minute,
                    closing_AM_or_PM : Sunday_closing_AM_or_PM

                },
                 {  day: 'Monday',
                    opening_hour: Monday_opening_hour,
                    opening_minute: Monday_opening_minute,
                    opening_AM_or_PM: Monday_opening_AM_or_PM,
                    closing_hour: Monday_closing_hour,
                    closing_minute: Monday_closing_minute,
                    closing_AM_or_PM: Monday_closing_AM_or_PM
                },
                 {  day: 'Tuesday',
                    opening_hour: Tuesday_opening_hour,
                    opening_minute: Tuesday_opening_minute,
                    opening_AM_or_PM: Tuesday_opening_AM_or_PM,
                    closing_hour: Tuesday_closing_hour,
                    closing_minute: Tuesday_closing_minute,
                    closing_AM_or_PM: Tuesday_closing_AM_or_PM
                },
                 {  day: 'Wednesday',
                    opening_hour: Wednesday_opening_hour,
                    opening_minute: Wednesday_opening_minute,
                    opening_AM_or_PM: Wednesday_opening_AM_or_PM,
                    closing_hour: Wednesday_closing_hour,
                    closing_minute: Wednesday_closing_minute,
                    closing_AM_or_PM: Wednesday_closing_AM_or_PM
                },
                 {  day: "Thursday",
                    opening_hour: Thursday_opening_hour,
                    opening_minute: Thursday_opening_minute,
                    opening_AM_or_PM: Thursday_opening_AM_or_PM,
                    closing_hour: Thursday_closing_hour,
                    closing_minute: Thursday_closing_minute,
                    closing_AM_or_PM: Thursday_closing_AM_or_PM
                },
                 {  day: 'Friday',
                    opening_hour: Friday_opening_hour,
                    opening_minute: Friday_opening_minute,
                    opening_AM_or_PM: Friday_opening_AM_or_PM,
                    closing_hour: Friday_closing_hour,
                    closing_minute: Friday_closing_minute,
                    closing_AM_or_PM: Friday_closing_AM_or_PM
                },
                 {  day: 'Saturday',
                    opening_hour: Saturday_opening_hour,
                    opening_minute: Saturday_opening_minute,
                    opening_AM_or_PM: Saturday_opening_AM_or_PM,
                    closing_hour: Saturday_closing_hour,
                    closing_minute: Saturday_closing_minute,
                    closing_AM_or_PM: Saturday_closing_AM_or_PM
                }
            ]

        },
    })
}