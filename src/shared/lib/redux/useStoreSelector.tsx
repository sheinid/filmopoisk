import type { RootState } from "app/store";
import { useSelector, type TypedUseSelectorHook } from "react-redux";

export const useStoreSelector: TypedUseSelectorHook<RootState> = useSelector;
