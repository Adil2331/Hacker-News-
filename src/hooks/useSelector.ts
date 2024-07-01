// Core
import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from "react-redux";

// Types
import { RootState } from "../redux/store";

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
