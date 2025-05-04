import Head from "next/head";
import EditPageContent from "@/components/edit/EditPageContent";

export const metadata = {
  title: "Edit Drum Machine | DrumMachine v2",
  description: "Edit your drum machine sounds and banks",
};

const EditPage = () => {
  return (
    <>
      <Head>
        <title>Edit Drum Machine | DrumMachine v2</title>
        <meta
          name="description"
          content="Edit your drum machine sounds and banks"
        />
      </Head>

      <EditPageContent />
    </>
  );
};

export default EditPage;
