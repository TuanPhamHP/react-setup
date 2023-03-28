import { useEffect } from 'react';
import { Route, Routes, Outlet } from 'react-router';

export default function Supplies() {
	useEffect(() => {
		document.title = 'Msg DEV';
	});
	return (
		<>
			<Outlet />
		</>
	);
}
