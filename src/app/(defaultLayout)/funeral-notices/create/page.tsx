import FuneralNoticeForm from "@/components/module/obituaries-notices/funeral-notice-form";

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="bg-[#f3f1ef] rounded-lg shadow-md p-8">
          <h1 className="text-[20px] font-bold text-[#14261C] mb-2">
            Create Funeral Notice
          </h1>
          <FuneralNoticeForm />
        </div>
      </div>
    </main>
  );
}
