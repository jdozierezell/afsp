SELECT DISTINCT
	posts.ID AS ID
    ,posts.post_title AS Title
    ,meta1.meta_value AS Website
    ,meta2.meta_value AS 'Host/Sponsor'
    ,meta3.meta_value AS 'Host/Sponsor Website'
    ,meta4.meta_value AS 'Group Demographic'
    ,meta5.meta_value AS 'Group Type'
    ,meta6.meta_value AS 'Contact 0 Name'
    ,meta7.meta_value AS 'Contact 0 Phone'
    ,meta8.meta_value AS 'Contact 0 Email'
    ,meta9.meta_value AS 'Contact Persons'
    ,meta10.meta_value AS 'Registration Process'
    ,meta11.meta_value AS 'Support Group Meets'
    ,meta12.meta_value AS 'Meeting Frequency'
    ,meta13.meta_value AS 'Semimonthly 0 Occurence'
    ,meta14.meta_value AS 'Semimonthly 0 Day'
    ,meta15.meta_value AS 'Semimonthly 0 Start'
    ,meta16.meta_value AS 'Semimonthly 0 End'
    ,meta17.meta_value AS 'Semimonthly 1 Occurence'
    ,meta18.meta_value AS 'Semimonthly 1 Day'
    ,meta19.meta_value AS 'Semimonthly 1 Start'
    ,meta20.meta_value AS 'Semimonthly 1 End'
    ,meta21.meta_value AS 'Country'
    ,meta22.meta_value AS 'Meeting Site'
    ,meta23.meta_value AS 'Street Address'
    ,meta24.meta_value AS 'City'
    ,meta25.meta_value AS 'State'
    ,meta26.meta_value AS 'Zip Code'
    ,meta27.meta_value AS 'Facilitator'
    ,meta28.meta_value AS 'Costs'
    ,meta29.meta_value AS 'Additional Information'
    ,meta30.meta_value AS 'Your Name'
    ,meta31.meta_value AS 'Your Email Address'
    ,meta32.meta_value AS 'Your Phone Number'
    ,meta33.meta_value AS 'Country of Residence'
    ,meta34.meta_value AS 'Address 1'
    ,meta35.meta_value AS 'Address 2'
    ,meta36.meta_value AS 'Your City'
    ,meta37.meta_value AS 'Your State'
    ,meta38.meta_value AS 'Your Zip Code'
    ,meta39.meta_value AS 'Volunteer With AFSP'
    ,meta40.meta_value AS 'Meeting Place'
FROM 
	wp_posts AS posts
    JOIN wp_postmeta as meta1 ON posts.ID = meta1.post_id
    JOIN wp_postmeta as meta2 ON posts.ID = meta2.post_id
    JOIN wp_postmeta as meta3 ON posts.ID = meta3.post_id
    JOIN wp_postmeta as meta4 ON posts.ID = meta4.post_id
    JOIN wp_postmeta as meta5 ON posts.ID = meta5.post_id
    JOIN wp_postmeta as meta6 ON posts.ID = meta6.post_id
    JOIN wp_postmeta as meta7 ON posts.ID = meta7.post_id
    JOIN wp_postmeta as meta8 ON posts.ID = meta8.post_id
    JOIN wp_postmeta as meta9 ON posts.ID = meta9.post_id
    JOIN wp_postmeta as meta10 ON posts.ID = meta10.post_id
    JOIN wp_postmeta as meta11 ON posts.ID = meta11.post_id
    JOIN wp_postmeta as meta12 ON posts.ID = meta12.post_id
    JOIN wp_postmeta as meta13 ON posts.ID = meta13.post_id
    JOIN wp_postmeta as meta14 ON posts.ID = meta14.post_id
    JOIN wp_postmeta as meta15 ON posts.ID = meta15.post_id
    JOIN wp_postmeta as meta16 ON posts.ID = meta16.post_id
    JOIN wp_postmeta as meta17 ON posts.ID = meta17.post_id
    JOIN wp_postmeta as meta18 ON posts.ID = meta18.post_id
    JOIN wp_postmeta as meta19 ON posts.ID = meta19.post_id
    JOIN wp_postmeta as meta20 ON posts.ID = meta20.post_id
    JOIN wp_postmeta as meta21 ON posts.ID = meta21.post_id
    JOIN wp_postmeta as meta22 ON posts.ID = meta22.post_id
    JOIN wp_postmeta as meta23 ON posts.ID = meta23.post_id
    JOIN wp_postmeta as meta24 ON posts.ID = meta24.post_id
    JOIN wp_postmeta as meta25 ON posts.ID = meta25.post_id
    JOIN wp_postmeta as meta26 ON posts.ID = meta26.post_id
    JOIN wp_postmeta as meta27 ON posts.ID = meta27.post_id
    JOIN wp_postmeta as meta28 ON posts.ID = meta28.post_id
    JOIN wp_postmeta as meta29 ON posts.ID = meta29.post_id
    JOIN wp_postmeta as meta30 ON posts.ID = meta30.post_id
    JOIN wp_postmeta as meta31 ON posts.ID = meta31.post_id
    JOIN wp_postmeta as meta32 ON posts.ID = meta32.post_id
    JOIN wp_postmeta as meta33 ON posts.ID = meta33.post_id
    JOIN wp_postmeta as meta34 ON posts.ID = meta34.post_id
    JOIN wp_postmeta as meta35 ON posts.ID = meta35.post_id
    JOIN wp_postmeta as meta36 ON posts.ID = meta36.post_id
    JOIN wp_postmeta as meta37 ON posts.ID = meta37.post_id
    JOIN wp_postmeta as meta38 ON posts.ID = meta38.post_id
    JOIN wp_postmeta as meta39 ON posts.ID = meta39.post_id
    JOIN wp_postmeta as meta40 ON posts.ID = meta40.post_id
WHERE 
	posts.post_type = 'support_group'
    AND meta1.meta_key = 'support_group_website'
    AND meta2.meta_key = 'hosting_sponsoring_organization' 
    AND meta3.meta_key = 'hosting_sponsoring_organization_website' 
    AND meta4.meta_key = 'group_demographic' 
    AND meta5.meta_key = 'group_type' 
    AND meta6.meta_key = 'contact_persons_0_contact_name' 
    AND meta7.meta_key = 'contact_persons_0_contact_phone' 
    AND meta8.meta_key = 'contact_persons_0_contact_email'
    AND meta9.meta_key = 'contact_persons'
    AND meta10.meta_key = 'registration_process'
    AND meta11.meta_key = 'support_group_meets'
    AND meta12.meta_key = 'meeting_frequency'
    AND meta13.meta_key = 'semimonthly_days_and_times_0_occurence'
    OR meta13.meta_key = 'monthly_day_and_time_0_occurence'
    AND meta14.meta_key = 'semimonthly_days_and_times_0_day'
    OR meta14.meta_key = 'weekly_day_and_time_0_day'
    OR meta14.meta_key = 'monthly_day_and_time_0_day'
    AND meta15.meta_key = 'semimonthly_days_and_times_0_start_time'
    OR meta15.meta_key = 'weekly_day_and_time_0_start_time'
    OR meta15.meta_key = 'monthly_day_and_time_0_start_time'
    AND meta16.meta_key = 'semimonthly_days_and_times_0_end_time'
    OR meta16.meta_key = 'weekly_day_and_time_0_end_time'
    OR meta16.meta_key = 'monthly_day_and_time_0_end_time'
    AND meta17.meta_key = 'semimonthly_days_and_times_1_occurence'
    AND meta18.meta_key = 'semimonthly_days_and_times_1_day'
    AND meta19.meta_key = 'semimonthly_days_and_times_1_start_time'
    AND meta20.meta_key = 'semimonthly_days_and_times_1_end_time'
    AND meta21.meta_key = 'country'
    AND meta22.meta_key = 'meeting_site'
    AND meta23.meta_key = 'street_address'
    AND meta24.meta_key = 'city'
    AND meta25.meta_key = 'state'
    AND meta26.meta_key = 'zip_postal_code'
    AND meta27.meta_key = 'facilitator'
    AND meta28.meta_key = 'costs'
    AND meta29.meta_key = 'additional_information'
    AND meta30.meta_key = 'your_name'
    AND meta31.meta_key = 'your_email_address'
    AND meta32.meta_key = 'your_phone_number'
    AND meta33.meta_key = 'country_residence'
    AND meta34.meta_key = 'address_line_1'
    AND meta35.meta_key = 'address_line_2'
    AND meta36.meta_key = 'your_city'
    AND meta37.meta_key = 'your_state'
    AND meta38.meta_key = 'your_zip_postal_code'
    AND meta39.meta_key = 'volunteer_with_afsp'
    AND meta40.meta_key = 'meeting_place'
    