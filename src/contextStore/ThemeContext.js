import React, { useState } from 'react';

const ThemeContext = React.createContext({});
function Local({ children }) {
	const [user, setUser] = useState(null);
	const setUserLogged = payload => {
		setUser(payload);
	};
	const value = {
		user,
		setUserLogged,
	};
	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
export { ThemeContext, Local };
