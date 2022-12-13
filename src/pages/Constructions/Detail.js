import { useLocation, useParams } from 'react-router';

export default function ConstructionsDetail() {
	const location = useLocation();
	let { id } = useParams();
	console.log(location);
	return (
		<>
			<h1>Wellcome to Construction Detail {id}</h1>
		</>
	);
}
