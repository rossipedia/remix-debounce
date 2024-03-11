import { useFetcher } from '@remix-run/react';
import { debounce } from 'lodash-es';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { SearchResults } from '~/components/SearchResults';

import type { loader as searchLoader } from './api.posts';

export default function Component() {
  const fetcher = useFetcher<typeof searchLoader>();
  const { submit, state } = fetcher;

  // Instead, we can create a debounced search function that we can
  // call on every change to the input
  const debouncedSearch = useMemo(
    () =>
      debounce((e: ChangeEvent<HTMLInputElement>) => {
        submit(e.target.form);
      }, 500),
    [submit]
  );

  // Buuut we still need a pending state to handle the case where
  // we're waiting for the debounced search to fire.
  const [pending, setPending] = useState(false);
  useEffect(() => {
    if (state === 'idle') {
      setPending(false);
    }
  }, [state]);

  return (
    <fetcher.Form action="/api/posts" method="get">
      <div className="flex flex-col gap-4">
        <input
          type="text"
          // value={search}
          name="q"
          placeholder="Search posts..."
          onChange={(e) => {
            // And we need two things in this event handler
            // And the updates to `pending` aren't colocated, which is a bit
            // yuck
            setPending(true);
            debouncedSearch(e);
          }}
        />

        {pending && <p>Loading...</p>}

        {!pending && <SearchResults results={fetcher.data} />}
      </div>
    </fetcher.Form>
  );
}
