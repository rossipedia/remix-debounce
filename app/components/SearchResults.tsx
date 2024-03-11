import { SerializeFrom } from '@remix-run/node';
import { Post } from '~/routes/api.posts';

export function SearchResults({
  results,
}: {
  results: SerializeFrom<Post[]> | undefined;
}) {
  if (!results || results.length === 0) {
    return null;
  }

  return (
    <ul className="max-h-[600px] overflow-y-scroll flex flex-col list-none m-0 p-0 gap-6">
      {results.map((result) => (
        <li key={result.id} className="m-0 p-0 flex flex-col gap-1">
          <div className="font-bold">{result.title}</div>
          <div className="text-sm italic text-gray-400">{result.body}</div>
        </li>
      ))}
    </ul>
  );
}
