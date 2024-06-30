import type { StoreDispatch } from "app/store";
import { useDispatch } from "react-redux";

export const useStoreDispatch = useDispatch.withTypes<StoreDispatch>();
