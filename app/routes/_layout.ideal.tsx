import { useFetcher } from '@remix-run/react';
import { SearchResults } from '~/components/SearchResults';

import type { loader as searchLoader } from './api.posts';

// This is ideally what we want
export default function Component() {
  const fetcher = useFetcher<typeof searchLoader>();

  return (
    <fetcher.Form action="/api/posts" method="get">
      <div className="flex flex-col gap-4">
        <input
          type="text"
          name="q"
          placeholder="Search posts..."
          onChange={(e) => {
            e.target.form?.requestSubmit();
          }}
        />

        {fetcher.state !== 'idle' && <p>Loading...</p>}
        {fetcher.state === 'idle' && <SearchResults results={fetcher.data} />}
      </div>
    </fetcher.Form>
  );
}
