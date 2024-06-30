import { store } from "app/store";
import { Provider } from "react-redux";

interface ProvidersProps {
	readonly children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
	return <Provider store={store}>{children}</Provider>;
};
