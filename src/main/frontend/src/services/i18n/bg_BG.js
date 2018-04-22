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
		manage_news: 'Статии'
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
	},
	wysiwyg_editor_labels: {
		add_image: 'Добавете снимка',
		add_video: 'Добавете видео',
		add_link: 'Добавете линк',
		add_link_placeholder: 'Поставете линк за връзка към друг сайт (например Twitter) и настиснете Enter',
		add_video_placeholder: 'Поставете линк за връзка YouTube, Vimeo или друг виедо линк и настиснете Enter',
		add_video_caption: 'Въведете подзаглавие (не е задължително)',
		body_placeholder: 'Напишете съдържание тук',
		regulation_body_placeholder: 'Напишете регулация тук',
		body_title: 'Заглавие',
		button_to_metadata: 'Следващта стъпка',
		button_save_content: 'Запази съдържанието',
		title: 'Въведете заглавие тук',
		subtitle: 'Въведете подзаглавие тук (не е задължително)',
		title_required: 'Трябва да въведете заглавие',
		content_required: 'Трябва да въведете текст',
		video_embedding_error: 'Видеото не може да бъде намерено или сайтът не поддържа вграждане на видеото.',
		embedding_error: 'Линкът не може да бъде намерен или сайтът не поддържа вграждане на видеото.'
	},
	news_creation_wizard_component: {
		element_content: {
			data: 'Съдържание',
			sub: 'Създаване на съдържание'
		},
		element_metadata: {
			data: 'Метадата',
			sub: 'Въвеждане на метаданни',
			review: 'Преглед на метаданните'
		},
		element_publish: {
			data: 'Публикуване',
			sub: 'Публикуване на статията',
			sub_regulation: 'Публикуване на регулацията',
			sub_poll: 'Публикуване на анкетата',
			sub_event: 'Публикуване на събитие'
		}
	},
	article_management: {
		articles: 'Статии',
		draft: 'Чернови',
		published: 'Публикувани',
		filter: 'Филтър',
		open: 'Отвори',
		stats: 'Статистика',
		edit: 'Промени',
		delete: 'Изтрий',
		publish: 'Публикувай',
		details: 'Детайли',
		saving: 'Публикуването на статията е в процес на обработка...',
		to_all_articles: 'Управление на статии',
		article_details: 'Отворете новосъздадената статия',
		article_is_active_until: 'Статията ще бъде активна за четене от служителитете до %{endDate}',
		article_is_active_since: 'Статията е активна за четене от служителитете от %{startDate} и няма крайна дата',
		article_is_inactive_until: 'Статията ще бъде активна за четене от служителитете на %{startDate}',
		article_is_inactive_since: 'Статията е била активна за четене от служителите на %{endDate}',
		active_label: 'Активна',
		inactive_label: 'Неактивна',
		future_active_label: 'Ще бъде публикувана',
		not_found_title: 'Няма налични статии в тази категория',
		not_items_found_title: 'Няма налични статии в тази категория',
		to_news: 'Всички новини'
	},
	meta_data_section: {
		start_date: 'Начална дата',
		end_date: 'Крайна дата',
		validation: {
			start_date_is_after: 'Началаната дата не може да е след крайната',
			start_date_in_past: 'Стартовата дата не може да е в миналото',
			end_date_in_past: 'Крайната дата не може да е в миналото'
		},
		date_creation_title: 'Задаване на период на статията',
		date_creation_subtitle: 'В тази секция можете да зададете начална и крайна дата на статията. Тя ще бъда достъпна само за зададения период.',
		image_upload_title: 'Добавяне на снимка',
		show_article_image_title: 'Снимка на статията',
		show_article_image_subtitle: 'Снимката, която е заглавна за статията',
		show_news_description_title: 'Описание на статията',
		show_news_description_subtitle: 'Описание, което синтезира съдържанието на статията',
		show_tags_title: 'Тагове',
		show_tags_subtitle: 'Статията може да бъде намера чрез изброението тагове',
		show_article_dates_title: 'Дати на валидност',
		show_article_dates_subtitle: 'Статията ще бъде валидна между тези две дати',
		show_regulation_dates_subtitle: 'Регулацията ще бъде валидна между тези две дати',
		show_poll_dates_subtitle: 'Анкетата ще бъде валидна между тези две дати',
		show_event_dates_subtitle: 'Събитието ще бъде валиднo между тези две дати',
		image_upload_subtitle: 'Снимката ще бъде заглавна за новосъздадената статия.',
		choose_file_tooltip: 'Изберете снимка за статията от файловата система',
		notifications_title: 'Тип нотификация',
		notifications_subtitle: 'Изберете тип нотификация, която ще бъде получавана от всички в таргетираните групи',
		selected_notification_type: 'Избраният тип нотификация за тази статия е %{notificationType}',
		tags_title: 'Тагове',
		tags_subtitle: 'Изберете тагове, които да описват вашата статия',
		show_notifications_subtitle: 'Избран тип нотификация',
		crop_image_tooltip: 'Запазете тези размери за снимката',
		cancel_image_tooltip: 'Изтрийте снимката за тази статия',
		crop_profile_picture_tooltip: 'Запазете тези размери за снимката',
		cancel_profile_picture_tooltip: 'Откажете качването на снимка за този служител',
		choose_profile_picture_tooltip: 'Изберете снимка за служителя от файловата система',
		delete_profile_picture_tooltip: 'Изтрийте снимката за този служител',
		display_stats_title: 'Поверителност',
		display_stats_subtitle: 'Изберете поверителност на анкетата',
		display_stats_subtitle_explanation: 'Отговорите на анкетата ще бъдат видими според нивото на поверителност',
		save_button: 'Запазете метаданните',
		cancel_publish: 'Откажете публикуването',
		to_publish_button: 'Публикувай',
		publish_button: 'Публикувай',
		short_description_title: 'Кратко описание',
		short_description_subtitle: 'Описанието ще послужи за акцент на статията в списъка с новини. То би накарало читателя да прочете пълната статия. Напишете нещо кратко, акцентиращо и описващо вашата статия.',
		short_description_placeholder: 'Кратко описание на статията...',
		errors: {
			invalid_data: 'Имате невалидни данни'
		}
	},
	article_management_container: {
		main_title: 'Новини',
		sub_title: 'Управление на статии',
		show_editor_label: 'Създаване на статия',
		meta_data_label: 'Въвеждане на метаданни',
		publish_label: 'Публикуване на статия',
		back_to_management_button: 'Управление на статии',
		back_to_news_button: 'Обратно към новините',
		article: 'Статия',
		user_not_eligible: 'Не е възможно да прегледате тази статия, защото не е предназначена за вас',
		show_view_label: 'Новина',
		date_of_publish: 'Дата на публикуване: '
	},
	news_actions: {
		server_errors: {
			news_is_in_use: 'Невъзможно е изтриването на статията, защото се използва',
			news_not_found: 'Статията не съществува',
			file_acces_denied: 'Нямате достъп до файла',
			id_required_field: 'Статията трябва да има уникален идентификатор',
			description_length_too_long: 'Описанието не може да е повече от 200 символа',
			description_length_too_short: 'Описанието не може да е по-малко от 20 символа',
			description_required_field: 'Описанието трябва да бъде попълнено'
		},
		confirm_delete: 'Сигурни ли сте, че искате да изтриете тази статия?',
		success_delete: 'Статия %{name} беше успешно изтрита',
		success_create: 'Новината е създадена успешно като чернова!',
		success_update: 'Съдържанието на статията беше променено!',
		image_updated: 'Снимката беше добавена!',
		meta_data_updated: 'Мета данните са успешно променени',
		news_published: 'Новината е публикувана успешно!',
		news_already_published: 'Новината вече е публикувана!',
		publish_canceled: 'Публикуването е отменено',
		publish_already_canceled: 'Публикуването вече е отменено',
	},
};

export default bg;