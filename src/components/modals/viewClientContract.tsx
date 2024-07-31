import React from "react";

type ContractDetailsProp = {
  data: any;
  closeDialog: any;
};

const viewClientContract: React.FC<ContractDetailsProp> = ({
  data,
  closeDialog,
}) => {
  return (
    <div className="relative bg-white px-10 py-5 rounded-lg max-w-4xl w-full border border-black-400">
      <div className="bg-white rounded-lg">
        {data?.contract ? (
          <div className="mt-5">
            <h2 className="text-xl font-bold mb-2">Contract Preview</h2>
            <iframe
              src={`${data?.contract}#toolbar=0&navpanes=0&scrollbar=0`}
              width="100%"
              height="500px"
              className="border-0 overflow-x-hidden"
            />
          </div>
        ) : (
          <div className="text-center text-xl">No contract to show</div>
        )}
      </div>
      <button
        onClick={() => closeDialog(false)}
        className="absolute top-0 right-0 p-8 text-black bg-transparent text-2xl"
      >
        &times;{" "}
      </button>
    </div>
  );
};

export default viewClientContract;
