import React, { Suspense, useEffect } from 'react';
import nProgress from 'nprogress';
import AppRouter from './routing/AppRouter';
import { SnackbarProvider } from 'notistack';

const RouteFallback = () => {
	useEffect(() => {
		nProgress.start();
		return () => {
			nProgress.done();
			nProgress.remove();
		};
	}, []);
	return null;
};

function App() {
	return (
		<div className='App'>
			<Suspense fallback={<RouteFallback />}>
				<SnackbarProvider>
					<AppRouter />
				</SnackbarProvider>
			</Suspense>
		</div>
	);
}

export default App;
