import { Link } from 'react-router-dom';
import { useRouteError } from 'react-router-dom';
import styles from '../assets/styles/Button.module.scss';
export default function ErrorPage() {
	const error = useRouteError();

	return (
		<div>
			<p>Có lỗi xảy ra rồi nha.</p>
			<p>
				<b>Lỗi: </b> <i>{error.statusText || error.message}</i>
			</p>
			<Link className={styles.error} to={'/'}>
				Trang chủ
			</Link>
		</div>
	);
}
