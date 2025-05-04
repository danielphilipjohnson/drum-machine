"use client";
import Head from "next/head";
import EditPageContent from "@/components/edit/EditPageContent";
import Layout from "@/components/layout/Layout";

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
      <Layout onSoundBankChange={() => {}} currentBank="">
      <EditPageContent />
      </Layout>
    </>
  );
};

export default EditPage;
