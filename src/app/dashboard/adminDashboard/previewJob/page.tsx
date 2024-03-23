import Image from "next/image";
import Link from "next/link";
import React from "react";
import SuccessModal from "../successModal/successModal";

const page = () => {
  return (
    <div className="fixed top-[60px] left-[272px] w-[-webkit-fill-available] overflow-y-auto h-[90%]">
      <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg w-[99%] pt-4">
        <div className="p-4">
          <div>
            <Link href="/dashboard/adminDashboard/inputNewJob">
              <Image
                src="/arrowLeft.svg"
                alt="back-icon"
                width={20}
                height={20}
              />
            </Link>
          </div>
          <div className="absolute right-2 top-6 flex">
            <Link href="/dashboard/adminDashboard/previewJob">
              <button className="text-sm border border-gray-500 mr-6 text-black w-20 py-2 rounded-xl hover:shadow-xl">
                Edit
              </button>
            </Link>
            <Link href="/dashboard/adminDashboard/previewJob">
              <Image
                src="/forwardIcon.svg"
                alt="back-icon"
                width={24}
                height={24}
                className="inline mr-6"
              />
            </Link>
            <Link href="/dashboard/adminDashboard/previewJob">
              <SuccessModal />
            </Link>
          </div>
        </div>
      </div>
      <div className="p-8 bg-white shadow-lg rounded-lg mt-4 w-[99%]">
        <div className="mb-5">
          <h1 className="text-3xl font-bold">
            Looking for a Senior UX Designer
          </h1>
          <span className="inline-block bg-green-200 text-green-800 text-xs px-2 rounded">
            Full Time
          </span>
        </div>

        <div className="mb-5">
          <p className="text-gray-600">ABC Technologies</p>
          <p className="text-gray-600">Remote</p>
          <p className="font-semibold text-gray-900">$120k/yr</p>
        </div>

        <h2 className="text-lg font-semibold mb-4">Job Description</h2>
        <p className="text-gray-700 mb-8">
          Lörem ipsum #metoo kiskade deling och ide triktigt i egt. Aska tredede
          och plavis obel, av semir. Ysam lårskav. Heteromifagisk pegen. Novent
          liplamingen sens tygt. Utvigning abeda dogt analiga i trollfabrik.
          Antiskade jänade och måjöbelt i pörade obeber kaliga därför att
          ninydohet, kanyng. Tetrapp vin att hexasade dosk ifall hypov medan
          nenyvis gödade medeltism. Besovis köttskatt ogisk ifall megagam
          gigekonomi. Lena täkivöliga incel prode kongar. Avinvestera man
          proling inframide respektive dek premivis. Nollavfall disebel huruvida
          hästlasagne i polyvuska iktig. Rerade krol såsom tore, underturism.
          Transgraf benyre beliga, rogt sasm drinkorexi även om sonyr
          frågestrejka. Du kan vara drabbad. Regnbågsbarn ambitism androvalens
          pren krogon suprafangar. Ovödinde stafettläkare. Vinera depånde digon
          pena fastän gigast. Ditt ultrande. Des mins. Prekäd litrevis om än
          plalangen gönde parabel ologi att trer. Besm toligt då pokir,
          klimatneutral rovus tresam egok. Du kan vara{" "}
        </p>

        <h3 className="text-lg font-semibold mb-3">Responsibilities</h3>
        <ul className="list-disc list-inside text-gray-700 mb-8">
          <li>Task detail one</li>
          <li>Task detail two</li>
          <li>Task detail three</li>
          <li>Task detail four</li>
        </ul>
        <p className="text-gray-700 mb-8">
          Lörem ipsum #metoo kiskade deling och ide triktigt i egt. Aska tredede
          och plavis obel, av semir. Ysam lårskav. Heteromifagisk pegen. Novent
          liplamingen sens tygt. Utvigning abeda dogt analiga i trollfabrik.
          Antiskade jänade och måjöbelt i pörade obeber kaliga därför att
          ninydohet, kanyng. Tetrapp vin att hexasade dosk ifall hypov medan
          nenyvis gödade medeltism. Besovis köttskatt ogisk ifall megagam
          gigekonomi. Lena täkivöliga incel prode kongar. Avinvestera man
          proling inframide respektive dek premivis. Nollavfall disebel huruvida
          hästlasagne i polyvuska iktig. Rerade krol såsom tore, underturism.
        </p>
      </div>
    </div>
  );
};

export default page;
