import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import AppBar from './AppBar';

import { useState } from 'react';

import Auth from '../entities/User/ui/Auth';
import type { UserType } from '../entities/User/ui/model/userType';
import Todos from '../entities/Todo/ui/Todos';
import { autoLogin } from '../shared/util/autoLogin';

function App() {
	const userFromLS = autoLogin();
	// нужно для хранения пользователя(user)
	const [user, setUser] = useState<UserType | null>(userFromLS);

	return (
		<>
			<AppBar username={user?.username} />
			<div style={{ marginTop: '100px' }}></div>
			{user ? <Todos /> : <Auth setUser={setUser} />}
		</>
	);
}

export default App;
