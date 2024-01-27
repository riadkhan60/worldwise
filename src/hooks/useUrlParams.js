import { useSearchParams } from "react-router-dom";

export function useUrlParams() {
  const [searchParam] = useSearchParams();
  const lat = searchParam.get('lat');
  const lng = searchParam.get('lng');

  return [lat, lng];
}

