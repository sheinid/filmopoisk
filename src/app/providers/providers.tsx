import { ErrorBoundary } from "react-error-boundary";
import { Fallback } from "shared/ui/fallback";

interface ProvidersProps {
	readonly children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
	return <ErrorBoundary FallbackComponent={Fallback}>{children}</ErrorBoundary>;
};
