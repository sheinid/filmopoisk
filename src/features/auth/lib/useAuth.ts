import { authSlice } from "entities/auth";
import { useCallback, useMemo } from "react";
import { useStoreDispatch } from "shared/lib/redux/useStoreDispatch";
import { useStoreSelector } from "shared/lib/redux/useStoreSelector";

export const useAuth = () => {
	const dispatch = useStoreDispatch();
	const token = useStoreSelector((state) => state.auth.token);

	const isAuth = useMemo(() => !!token, [token]);

	const logout = useCallback(() => {
		dispatch(authSlice.logout());
	}, [dispatch]);

	return { isAuth, logout };
};
