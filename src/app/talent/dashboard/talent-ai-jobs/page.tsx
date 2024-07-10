"use client";
import React, { useState } from "react";
import CustomLoader from "@/components/customLoader";
import { formatString } from "@/utils/utils";
import JobDetailModal from "@/components/modals/jobDetailModal";
import { getMatchingJobsCandidate } from "@/api/applicants/getMatchingJobsCandidates";
import { useQuery } from "@tanstack/react-query";

const page = () => {
  const blogPosts = [
    {
      id: 4,
      title: "Inside Sales Coordinator",
      description:
        "<p>Inside Sales Coordinator, will drive our sales pipeline, generating new business through cold calling, nurturing leads, and closing deals. The candidate will work closely with a dynamic team to achieve ambitious sales targets and contribute to the company's growth.</p>",
      industry: "Technology",
      companyName: "Online Remote Recruiting Ltd.",
      qualification: "Bachelor",
      salaryOffered: '"3-4K"',
      requirements:
        "<ol><li>Conduct outbound calls to generate qualified leads and identify sales opportunities.</li><li>Effectively communicate product/service features and benefits, and tailor your approach to each customer's needs.</li><li>Schedule appointments for in-person or virtual meetings with qualified leads.</li><li>Follow up with leads quickly and professionally to maintain engagement and progress sales conversations.</li><li>Develop strong relationships with potential and existing customers, fostering trust and loyalty.</li><li>Prepare presentations and proposals to showcase the value proposition of our offerings.</li><li>Negotiate contracts and close deals, exceeding sales quotas and targets.</li><li>Maintain accurate records of customer interactions and sales activities within the CRM system.</li><li>Stay up-to-date on industry trends, competitor offerings, and company products/services.</li></ol>",
      responsibilities:
        "<ol><li>Minimum of 1 year experience in a sales role (inside or B2B sales preferred).</li><li>Have a proven track record of exceeding sales targets and quotas.</li><li>Excellent communication and interpersonal skills, with the ability to build rapport quickly.</li><li>Strong presentation and negotiation skills.</li><li>Proficiency in cold calling techniques and comfortable working in a fast-paced environment.</li><li>A positive attitude, self-motivation, and a drive to succeed.</li><li>Excellent organizational skills and the ability to manage multiple tasks simultaneously.</li><li>Proficient in CRM software and other relevant sales tools.</li></ol>",
      skillsRequired: [
        "Sales Process",
        "IT Technical Knowledge",
        "CRM",
        "Sales Process",
        "Communication Skills",
        "Organization",
        "Data Entry",
        "Customer Service",
        "Qualifying Leads",
        "Sales Reporting",
        "Presentation Skills",
      ],
      experienceRequired: "1",
      recruiter_id: null,
      jobStatus: "PUBLISHED",
      createdAt: "2024-06-02T23:44:18.255Z",
      updatedAt: "2024-06-02T23:44:18.255Z",
      isDeleted: false,
      jobType: "Month",
      contractType: "fullTime",
      currencyType: "AED",
      jobVenue: "onsite",
      location: "Dubai, UAE",
      isCompleted: false,
      isPublished: true,
      client_id: null,
      tier: null,
      applicationsCount: 2,
    },
    {
      id: 2,
      title: "Sales Account Manager",
      description:
        "<p>To oversee sales efforts and provide client assistance, we are seeking an experienced <strong>Sales Account Manager</strong>. A sales account manager's duties encompass managing customer connections, supervising the sales procedure, and serving as a point of contact.</p><p><br></p><p>A sales account manager needs to be very good at managing people, have a solid understanding of CRM software, and multitask. In the end, a top-notch sales account manager should have excellent problem-solving, business, and customer service abilities.</p><p><br></p><p>Experience of IT Companies (Networking, Security) along with exposure of <strong>UAE</strong> Market.</p>",
      industry: "Technology",
      companyName: "Online Remote Recruiting",
      qualification: "Master",
      salaryOffered: '"5k - 6k"',
      requirements:
        "<ul><li>A degree in business, marketing, or a related field.</li><li>Track record of success in a sales role.</li><li>Experience of IT Products (Networking, Security)</li><li>UAE Market exposure</li><li>Proficiency with MS Office and CRM software.</li><li>Outstanding social abilities.</li><li>An understanding of sales metrics.</li><li>The capacity to solve problems.</li></ul>",
      responsibilities:
        "<ul><li>Account management for sustained success.</li><li>Building trusting relationships with customers.</li><li>Creating fresh chances for sales.</li><li>Keeping an eye on agents to guarantee higher sales.</li><li>Genera ting transaction and account reports.</li><li>Monitoring account goals.</li><li>Keeping an eye on sales.</li></ul>",
      skillsRequired: ["Sales"],
      experienceRequired: "2",
      recruiter_id: null,
      jobStatus: "PUBLISHED",
      createdAt: "2024-05-01T21:25:45.795Z",
      updatedAt: "2024-05-01T21:25:45.795Z",
      isDeleted: false,
      jobType: "Month",
      contractType: "fullTime",
      currencyType: "AED",
      jobVenue: "onsite",
      location: "Dubai UAE",
      isCompleted: false,
      isPublished: true,
      client_id: 1,
      tier: "2",
      applicationsCount: 6,
    },
    {
      id: 6,
      title: "Travel Assistant",
      description:
        "<p>Travel Assistant Department: HospitalityReporting Structure: Reports to Travel Manager Introduction: Are you passionate about travel and providing exceptional customer service?</p><p><br></p><p>Do you have excellent organizational skills and attention to detail? If so, we have an exciting opportunity for you to join our team as a Travel Assistant, we are a leading company in the hospitality industry, dedicated to providing our clients with top-notch travel experiences.</p><p><br></p><p>As a Travel Assistant, you will play a crucial role in ensuring smooth and seamless travel arrangements for our clients, making their journeys memorable and hassle-free.</p>",
      industry: "Staffing & Recruiting",
      companyName: "Online Remote Recruiting Ltd.",
      qualification: "Bachelor",
      salaryOffered: '"20"',
      requirements:
        "<p>High school diploma or equivalent Bachelor's degree in Hospitality, Tourism, or a related field is preferred</p><p>Prior experience in the travel industry or customer service role is highly desirable</p><p>Strong knowledge of travel booking systems and online travel platforms</p><p>Excellent communication and interpersonal skills</p><p>Exceptional organizational and time management abilities</p><p>Attention to detail and accuracy in handling travel arrangements</p><p>Ability to work under pressure and meet tight deadlines</p><p>Proficiency in using MS Office and other relevant software</p><p>Flexibility to work evenings, weekends, and holidays as required</p><p>If you are a travel enthusiast with a passion for delivering exceptional customer service, we would love to hear from you.</p><p><br></p>",
      responsibilities:
        "<ul><li>Assist in coordinating travel arrangements for clients, including flights, accommodations, transportation, and activities Research and recommend travel destinations, attractions, and experiences based on client preferences and budget.</li><li>Handle all travel-related inquiries and provide prompt and accurate information to clients.</li><li>Prepare detailed itineraries for clients, including day-to-day activities, reservations, and contact information.</li><li>Coordinate with airlines, hotels, and other service providers to ensure all bookings are confirmed and accurate.</li><li>Monitor travel schedules and make necessary adjustments or arrangements in case of delays, cancellations, or changes.</li><li>Assist in resolving any travel-related issues or complaints, providing excellent customer service at all times.</li><li>Maintain up-to-date knowledge of travel industry trends, regulations, and best practices.</li><li>Collaborate with the Travel Manager and team members to improve processes and enhance the overall travel experience for clients.</li></ul>",
      skillsRequired: ["travel"],
      experienceRequired: "2",
      recruiter_id: null,
      jobStatus: "COMPLETED",
      createdAt: "2024-06-03T00:26:23.181Z",
      updatedAt: "2024-06-03T00:26:23.181Z",
      isDeleted: false,
      jobType: "Hour",
      contractType: "fullTime",
      currencyType: "CAD",
      jobVenue: "onsite",
      location: "Toronto, ON",
      isCompleted: true,
      isPublished: false,
      client_id: null,
      tier: null,
      applicationsCount: 0,
    },
    {
      id: 9,
      title: "Accounting and Administration Lead",
      description:
        "<p>The Accounting and Administration Lead is responsible for overseeing and managing the accounting and administrative operations at the Client Site. This role ensures accurate financial record-keeping, timely reporting, maintaining accounting policies/procedures, completing month-end / year-end close processes, as well as overseeing and implementing efficient administrative procedures within the resort environment.</p>",
      industry: "Hospitality",
      companyName: "Online Remote Recruiting",
      qualification: "Bachelor",
      salaryOffered: '"60,000"',
      requirements:
        "<p>- Bachelor's degree in Accounting, Finance, Business Administration, or a related field.</p><p>- Professional accounting designation (CPA) is preferred.</p><p>- Minimum of 5 years of progressive experience in accounting.</p><p>- Proficiency in accounting software (e.g., QuickBooks, Lightspeed, Cloudbeds) and Microsoft Office Suite.&nbsp;Experience with Payworks payroll software is an asset.</p><p>- Strong knowledge of accounting principles, practices, and regulations with a preference for application in the hospitality industry.</p><p>- Excellent analytical, problem-solving, and decision-making skills.</p><p>- Effective leadership, communication, and interpersonal abilities.</p><p>- Attention to detail and accuracy in financial reporting.</p><p>- Ability to manage multiple tasks and prioritize effectively in a fast-paced resort environment.</p><p>- Knowledge of office equipment, procedures, and best practices in the hospitality sector.</p><p>- Familiarity with resort operations, including golf, accommodations, and food and beverage divisions (preferred).</p>",
      responsibilities:
        "<p><strong><em>Accounting Responsibilities</em></strong></p><p>- Supervise and coordinate the daily accounting activities, including accounts payable, accounts receivable, payroll, and general ledger maintenance for the resort.</p><p>- Review and ensure the accuracy of financial records, reports, and statements related to resort operations, including golf, accommodations, and food and beverage divisions.</p><p>- Develop and implement accounting policies, procedures, and internal controls to maintain compliance with relevant regulations and industry standards for the golf and hospitality sector.</p><p>- Prepare and analyze monthly, quarterly, and annual financial reports for management review, highlighting key performance indicators and variances.</p><p>- Coordinate and oversee the annual audit process, working closely with external auditors and providing necessary documentation and support.</p><p>- Manage the budgeting process for the resort, monitoring budget variances and providing financial analysis and recommendations.</p><p>- Provide guidance and support on complex accounting issues and transactions specific to the resort industry.</p><p>&nbsp;</p><p><strong><em>Administrative Responsibilities</em></strong></p><p>- Develop and implement administrative policies, procedures, and standards to streamline operations and improve efficiency across various resort departments.</p><p>- Oversee the completion of inventory and the maintenance of inventory-related best practices across various resort departments.</p><p>- Assist department leads with supplier management and product procurement.</p><p>- Oversee and coordinate the maintenance of office equipment, supplies, and inventory for the administration of the business, ensuring adequate resources are available for smooth operations.</p>",
      skillsRequired: [
        "Accounting Operations",
        "Financial Reporting/Budgeting",
        "Attention to Detail",
        "Analytical Thinking",
        "Process Improvement",
        "Regulatory Compliance",
        "CPA",
        "decision-making",
        "Multi-Tasking",
      ],
      experienceRequired: "5",
      recruiter_id: null,
      jobStatus: "PUBLISHED",
      createdAt: "2024-06-25T11:19:01.786Z",
      updatedAt: "2024-06-25T11:19:01.786Z",
      isDeleted: false,
      jobType: "Year",
      contractType: "fullTime",
      currencyType: "CAD",
      jobVenue: "onsite",
      location: "Corbyville, ON",
      isCompleted: false,
      isPublished: true,
      client_id: 1,
      tier: "1",
      applicationsCount: 5,
    },
    {
      id: 10,
      title: "Cisco Stealthwatch - Network Security Analyst - Analytics",
      description:
        "<p>One of the largest global Professional Services clients is seeking a strong cybersecurity consultant for a 6-month remote contract.</p><p>Our client is looking for a consultant who can work directly in their own clients operations team, supporting their Cisco Stealthwatch (Secure Network Analytics) environment.</p><p>The successful candidate will be maintaining, and improving the existing environment.</p><p>They should be comfortable recommending best practices and protocols to improve the clients Security practices, and capabilities.</p><p>Interested candidates should have experience generating recommendations and reporting technical account leads for use in Executive-level presentations.</p><p>Candidates should have a strong technical Infrastructure, Cloud, and Network security background, ideally with experience with MS Defender and Splunk.</p><p>This resource will be embedded in the client team and will work with an existing Services team.</p><p>This is an opportunity to work with Dell consulting Services Cyber Security Team.</p><p>They have class-leading resources and global support capabilities.</p>",
      industry: "Technology",
      companyName: "Online Remote Recruiting",
      qualification: "Bachelor",
      salaryOffered: '"83.0"',
      requirements:
        "<ul><li>This is a remote opportunity - The candidate must be located in Canada.</li><li>Must have at least 2 years of experience - with Hands-on - Design, Deployment and Maintenance - Documentation and Arch Diagrams</li><li>All relevant security certifications from Cisco or other similar vendors (Good to have)</li></ul>",
      responsibilities:
        "<p>1) <strong>Experience with Cisco Stealthwatch (Secure Network Analytics)</strong></p><p><br></p><p>-maintain and monitor the existing environment</p><p><br></p><p>- advise on security improvements and best practices</p><p><br></p><p>2) <strong>Strong documentation and reporting background</strong></p><p><br></p><p>-experience providing reports, advising leads on recommendations for board-level presentation</p><p><br></p><p>3) <strong>Strong Network Security Experience</strong></p><p><br></p><p>- worked with Defender or Splunk (integration - log management or connectors deployment)</p><p><br></p><p>- understanding of cloud, and security tools and required protocols</p>",
      skillsRequired: [
        "Cisco Stealthwatch",
        "Secure Network Analytics",
        "Network security Experience",
        "Splunk",
        "Defender",
        "Cyber security",
      ],
      experienceRequired: "2",
      recruiter_id: null,
      jobStatus: "PUBLISHED",
      createdAt: "2024-07-04T17:58:33.398Z",
      updatedAt: "2024-07-04T17:58:33.398Z",
      isDeleted: false,
      jobType: "Hour",
      contractType: "fullTime",
      currencyType: "CAD",
      jobVenue: "remote",
      location: "Canada",
      isCompleted: false,
      isPublished: true,
      client_id: 1,
      tier: "1",
      applicationsCount: 8,
    },
    {
      id: 1,
      title: "Business Development Executive",
      description:
        "<p><strong>Online Remote Recruiting</strong> is looking for an open part-time Position as a <strong>Business Development Executive.</strong></p>",
      industry: "Technology",
      companyName: "Online Remote Recruiting",
      qualification: "Bachelor",
      salaryOffered: '"20 - 40"',
      requirements:
        "<p>1. Canadian Citizen</p><p>2. Based in Ontario, Canada</p><p>3. Proven track record in sales, business development, or related fields.</p><p>4. Strong communication, negotiation, and interpersonal skills.</p><p>5. Ability to work independently and as part of a team.</p><p>6. Familiarity with the Ontario business landscape is a must.</p><p>7. Willingness to travel as needed.</p>",
      responsibilities:
        "<p>1. Identify and research potential clients and industries to target for new business opportunities. Develop and maintain a robust lead generation process.</p><p>2. Build and maintain strong relationships with prospective clients.</p><p>3. Collaborate with the internal team to design and implement effective sales strategies.</p><p>4. Work closely with the management to achieve sales targets and goals.</p><p>5. Represent the company at industry events and conferences to network and generate qualified leads.</p>",
      skillsRequired: ["Business Development Executive"],
      experienceRequired: "5",
      recruiter_id: null,
      jobStatus: "PUBLISHED",
      createdAt: "2024-05-01T19:42:54.938Z",
      updatedAt: "2024-05-01T19:42:54.938Z",
      isDeleted: false,
      jobType: "Hour",
      contractType: "partTime",
      currencyType: "CAD",
      jobVenue: "remote",
      location: "Ontario, Canada",
      isCompleted: false,
      isPublished: true,
      client_id: null,
      tier: null,
      applicationsCount: 5,
    },
    {
      id: 1,
      title: "Business Development Executive",
      description:
        "<p><strong>Online Remote Recruiting</strong> is looking for an open part-time Position as a <strong>Business Development Executive.</strong></p>",
      industry: "Technology",
      companyName: "Online Remote Recruiting",
      qualification: "Bachelor",
      salaryOffered: '"20 - 40"',
      requirements:
        "<p>1. Canadian Citizen</p><p>2. Based in Ontario, Canada</p><p>3. Proven track record in sales, business development, or related fields.</p><p>4. Strong communication, negotiation, and interpersonal skills.</p><p>5. Ability to work independently and as part of a team.</p><p>6. Familiarity with the Ontario business landscape is a must.</p><p>7. Willingness to travel as needed.</p>",
      responsibilities:
        "<p>1. Identify and research potential clients and industries to target for new business opportunities. Develop and maintain a robust lead generation process.</p><p>2. Build and maintain strong relationships with prospective clients.</p><p>3. Collaborate with the internal team to design and implement effective sales strategies.</p><p>4. Work closely with the management to achieve sales targets and goals.</p><p>5. Represent the company at industry events and conferences to network and generate qualified leads.</p>",
      skillsRequired: ["Business Development Executive"],
      experienceRequired: "5",
      recruiter_id: null,
      jobStatus: "PUBLISHED",
      createdAt: "2024-05-01T19:42:54.938Z",
      updatedAt: "2024-05-01T19:42:54.938Z",
      isDeleted: false,
      jobType: "Hour",
      contractType: "partTime",
      currencyType: "CAD",
      jobVenue: "remote",
      location: "Ontario, Canada",
      isCompleted: false,
      isPublished: true,
      client_id: null,
      tier: null,
      applicationsCount: 5,
    },
    {
      id: 1,
      title: "Business Development Executive",
      description:
        "<p><strong>Online Remote Recruiting</strong> is looking for an open part-time Position as a <strong>Business Development Executive.</strong></p>",
      industry: "Technology",
      companyName: "Online Remote Recruiting",
      qualification: "Bachelor",
      salaryOffered: '"20 - 40"',
      requirements:
        "<p>1. Canadian Citizen</p><p>2. Based in Ontario, Canada</p><p>3. Proven track record in sales, business development, or related fields.</p><p>4. Strong communication, negotiation, and interpersonal skills.</p><p>5. Ability to work independently and as part of a team.</p><p>6. Familiarity with the Ontario business landscape is a must.</p><p>7. Willingness to travel as needed.</p>",
      responsibilities:
        "<p>1. Identify and research potential clients and industries to target for new business opportunities. Develop and maintain a robust lead generation process.</p><p>2. Build and maintain strong relationships with prospective clients.</p><p>3. Collaborate with the internal team to design and implement effective sales strategies.</p><p>4. Work closely with the management to achieve sales targets and goals.</p><p>5. Represent the company at industry events and conferences to network and generate qualified leads.</p>",
      skillsRequired: ["Business Development Executive"],
      experienceRequired: "5",
      recruiter_id: null,
      jobStatus: "PUBLISHED",
      createdAt: "2024-05-01T19:42:54.938Z",
      updatedAt: "2024-05-01T19:42:54.938Z",
      isDeleted: false,
      jobType: "Hour",
      contractType: "partTime",
      currencyType: "CAD",
      jobVenue: "remote",
      location: "Ontario, Canada",
      isCompleted: false,
      isPublished: true,
      client_id: null,
      tier: null,
      applicationsCount: 5,
    },
    {
      id: 1,
      title: "Business Development Executive",
      description:
        "<p><strong>Online Remote Recruiting</strong> is looking for an open part-time Position as a <strong>Business Development Executive.</strong></p>",
      industry: "Technology",
      companyName: "Online Remote Recruiting",
      qualification: "Bachelor",
      salaryOffered: '"20 - 40"',
      requirements:
        "<p>1. Canadian Citizen</p><p>2. Based in Ontario, Canada</p><p>3. Proven track record in sales, business development, or related fields.</p><p>4. Strong communication, negotiation, and interpersonal skills.</p><p>5. Ability to work independently and as part of a team.</p><p>6. Familiarity with the Ontario business landscape is a must.</p><p>7. Willingness to travel as needed.</p>",
      responsibilities:
        "<p>1. Identify and research potential clients and industries to target for new business opportunities. Develop and maintain a robust lead generation process.</p><p>2. Build and maintain strong relationships with prospective clients.</p><p>3. Collaborate with the internal team to design and implement effective sales strategies.</p><p>4. Work closely with the management to achieve sales targets and goals.</p><p>5. Represent the company at industry events and conferences to network and generate qualified leads.</p>",
      skillsRequired: ["Business Development Executive"],
      experienceRequired: "5",
      recruiter_id: null,
      jobStatus: "PUBLISHED",
      createdAt: "2024-05-01T19:42:54.938Z",
      updatedAt: "2024-05-01T19:42:54.938Z",
      isDeleted: false,
      jobType: "Hour",
      contractType: "partTime",
      currencyType: "CAD",
      jobVenue: "remote",
      location: "Ontario, Canada",
      isCompleted: false,
      isPublished: true,
      client_id: null,
      tier: null,
      applicationsCount: 5,
    },
  ];

  const [candidateId, setCandidateId] = React.useState<any>(null);
  React.useEffect(() => {
    const id: any = localStorage.getItem("candidateId");
    setCandidateId(parseInt(id));
  }, []);
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["get all naukrian"],
    queryFn: () => getMatchingJobsCandidate(candidateId),
  });
  console.log("datadatadatadata", data);

  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const openDetailModal = (item: any) => {
    setIsDialogOpen(!isDialogOpen);
    setSelectedItem(item);
  };
  const closeDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  return (
    <div className="fixed top-[60px] sm:left-[272px] w-[-webkit-fill-available] bg-gray-50 dark:bg-gray-900 py-3 sm:py-5 h-[90%] overflow-y-auto">
      {/* {isLoading ? (
        <CustomLoader />
      ) : ( */}
      <div className="mx-auto w-full px-4 lg:px-12">
        <div className="relative sm:rounded-lg overflow-hidden w-full">
          {data?.matchingJobResults?.map((post: any, index: any) => {
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between w-full mx-auto max-h-[300px] mb-4 px-16"
              >
                <div className="flex">
                  <div className="w-[30%]">
                    <p
                      className="text-2xl font-bold cursor-pointer"
                      onClick={() => openDetailModal(post?.job)}
                    >
                      {post?.job?.title}
                    </p>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      {post?.job?.salaryOffered?.replace(/"/g, "") + " "}{" "}
                      {post?.job?.currencyType} / {post?.job?.jobType}
                    </p>
                    <p className="inline-block font-light dark:text-gray-400 bg-primary-orange text-white w-fit px-6 py-1 rounded-2xl my-2 mr-2">
                      {formatString(`${post?.job?.jobVenue}`)}
                    </p>
                    <p className="inline-block font-light dark:text-gray-400 bg-primary-orange text-white w-fit px-6 py-1 rounded-2xl my-2 mr-2">
                      {formatString(`${post?.job?.contractType}`)}
                    </p>

                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      {post?.job?.companyName}
                    </p>
                  </div>
                  <div className="w-[65%] mx-auto">
                    <div className="text-lg font-semibold mb-1">
                      AI Feedback
                    </div>
                    <div>
                      <div>
                        <span className="text-base font-semibold mb-1">
                          Relevancy Score:
                        </span>
                        <span className="text-gray-600 mb-4">
                          {" " + post?.result.relevancy_score}%
                        </span>
                      </div>
                      <div>
                        <span className="text-base font-semibold mb-1">
                          Recommendation:
                        </span>
                        <span className="text-gray-600 mb-4">
                          {" " +
                            post?.result?.recommended?.charAt(0).toUpperCase() +
                            post?.result?.recommended?.slice(1)}
                        </span>
                      </div>

                      <div>
                        <span className="text-base font-semibold mb-1">
                          Reason:
                        </span>
                        <span className="text-gray-600 mb-4">
                          {" " + post?.result.explanation}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {isDialogOpen && (
          <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
            <JobDetailModal data={selectedItem} closeDialog={closeDialog} />
          </div>
        )}
      </div>
      {/* )} */}
    </div>
  );
};

export default page;
