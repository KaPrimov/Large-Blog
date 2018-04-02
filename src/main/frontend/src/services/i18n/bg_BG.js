const bg = {
	home: {
		heading: 'Моделирайте и споделете идеите си'
	},
	navigation: {
		menu: 'Меню',
		blogs: 'Статии',
		login: 'Логин',
		register: ' Регистрация',
		admin: 'Администрация',
		logout: 'Отписване',
		news_create: 'Създай новина',
	},
	register: {
		label: 'Регистрирайте се',
		username_label: 'Име на потребителя',
		password_label: 'Парола',
		confirm_password_label: 'Потвърдете паролата',
		email_label: 'Email за връзка',
		btn: ' Регистрирайте се'
	},
	login: {
		btn: ' Логин',
		label: 'Логин'
	},
	common: {
		placeholders: {
			username: 'Име',
			password: 'Парола',
			confirm: 'Потвърдете паролата',
			email: 'Валиден Email',
			file_too_large: 'Възникна проблем. Общият размер на файловете е прекалено голям',
			upload_file_size_limit: 'Качването на файл е ограничено до %{size}МБ',
			unspecified_server_error: 'В момента има проблем с изпълнението на текущата операция. Моля, опитайте по-късно или се свържете с нашите системни администратори',
			no_authorities_error: 'Не притежавате необходимите права за достъп до страницата!',
			no_modify_privilege_wrn_msg: 'Не притежавате необходимите права за модификация на това поле',
		},
		validation: {
			required_field: 'Полето е задължително',
			max_length: 'Полето трябва да съдържа максимум %{size} букви и символи',
			min_length: 'Полето трябва да съдържа минимум %{size} букви и символи',
			required_field_with_name: 'Полето (%{fieldName}) е задължително',
			max_length_with_name: 'Полето (%{fieldName}) трябва да съдържа максимум %{size} букви и символи',
			min_length_with_name: 'Полето (%{fieldName}) трябва да съдържа минимум %{size} букви и символи',
			phone_number: 'Полето трябва да съдържа валиден телефонен номер',
			email: 'Полето трябва да съдържа валиден имейл адрес',
			email_already_exists: 'Друг потребител е регистриран с този имейл',
			url: 'Полето трябва да съдържа валиден URL адрес',
			number: 'Полето трябва да съдържа валидно число',
			invalid_birthdate: 'Служителят не трябва да бъде под 16 години',
			end_smaller_start: 'Крайната дата не може да бъде по-ранна от началната дата',
			positive_number: 'Полето трябва да съдържа положително число',
			connected_required_field: 'Полетo \'%{fieldName}\' трябва също да бъде попълнено',
			same_colors: 'Цветовете за типовете отпуски не трябва да се повтарят',
			same_leave_types: 'Типовете отпуски не трябва да се повтарят',
			fill_in_all_required_field: 'Трябва да попълните всички задължителни полета',
			passwords_do_not_match: 'Паролите не са еднакви',
			user_exists: 'Имате дупликиран юзърнейм или имейл'
		},
		access_error: 'Нямате необходимите права, за да достигнете тази страница.',
	},
	language_component: {
		lang: {
			bulgarian: 'Български',
			english: 'English'
		},
		shortLang: {
			lang: {
				bulgarian: 'бг',
				english: 'en'
			}
		}
	},
	user_actions: {
		register_success: 'Регистрирахте се успешно!',
		login_success: 'Логнахте се успешно!',
		login_failed: 'Грешно потребителско име или парола!',
		logout_success: 'Отписахте се успешно!'
	}
};

export default bg;