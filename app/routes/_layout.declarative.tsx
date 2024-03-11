import { useFetcher } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { SearchResults } from '~/components/SearchResults';

import type { loader as searchLoader } from './api.posts';

export default function Component() {
  // We use one state to control the search input
  const [search, setSearch] = useState('');
  // And another state to react to updates and debounce its value
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // And finally an effect + timeout to do the actual debouncing
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [search]);

  const fetcher = useFetcher<typeof searchLoader>();
  const { submit } = fetcher;

  // We need this effect to fire off the search in response to changes
  // to the debounced search value.
  useEffect(() => {
    if (debouncedSearch) {
      submit({ q: debouncedSearch }, { method: 'get', action: '/api/posts' });
    }
  }, [debouncedSearch, submit]);

  // And finally a `pending` state so we know when to show the loading message
  const isPending = fetcher.state !== 'idle' || search !== debouncedSearch;

  // Buuuuut... there's a small bug
  //
  // console.log({
  //   isPending,
  //   state: fetcher.state,
  //   search,
  //   debouncedSearch,
  //   data: !!fetcher.data && fetcher.data.length > 0,
  // });

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        value={search}
        name="q"
        placeholder="Search posts..."
        onChange={(e) => {
          // This is nice, because we only need to update a single state
          // and all our dependenc states and effects handle the rest
          // .. but it's a *lot* of plumbing
          setSearch(e.target.value);
        }}
      />

      {isPending && <p>Loading...</p>}

      {!isPending && <SearchResults results={fetcher.data} />}
    </div>
  );
}
