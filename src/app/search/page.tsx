"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "@/components/layout/Layout";
import soundBanks from "@/data/soundBanks";
import SearchInput from "@/components/search/SearchInput";
import SearchResultList from "@/components/search/SearchResultList";

type SearchResult = {
  keyCode: number;
  keyTrigger: string;
  id: string;
  soundFileName: string;
  url: string;
  bank: string;
};

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();

    const results = soundBanks
      .flatMap((bank) =>
        bank.soundFiles.map((file) => ({
          ...file,
          bank: bank.soundBanksName,
        })),
      )
      .filter((file) => file.soundFileName.toLowerCase().includes(query));

    setSearchResults(results);
  }, [searchQuery]);

  return (
    <>
      <Head>
        <title>Search Sounds | DrumMachine v2</title>
        <meta
          name="description"
          content="Search for sounds to use in your drum machine"
        />
      </Head>

      <Layout onSoundBankChange={() => {}} currentBank="">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-zinc-200 mb-6">
            Search Sounds
          </h1>

          <SearchInput value={searchQuery} onChange={setSearchQuery} />

          {searchQuery && (
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-zinc-300 mb-2">
                Results for &quot;{searchQuery}&quot;
              </h2>
              {searchResults.length === 0 && (
                <p className="text-zinc-500">
                  No results found. Try a different search term.
                </p>
              )}
            </div>
          )}

          {searchResults.length > 0 && (
            <SearchResultList results={searchResults} />
          )}
        </div>
      </Layout>
    </>
  );
};

export default SearchPage;
