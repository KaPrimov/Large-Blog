const gb = {
	home: {
		heading: 'Design and share your ideas'
	},
	navigation: {
		menu: 'Menu',
		blogs: 'Articles',
		login: 'Login',
		register: ' Register',
		admin: 'Admin',
		news_create: 'Create news',
	},
	register: {
		label: 'Register',
		username_label: 'Username',
		password_label: 'Password',
		confirm_password_label: 'Repeat Password',
		email_label: 'Your valid email',
		btn: 'Register',
		logout: 'Logout',
	},
	login: {
		btn: 'Login',
		label: 'Login'
	},
	common: {
		placeholders: {
			username: 'Username',
			password: 'Password',
			confirm: 'Repeat Password',
			email: 'Valid Email',
			file_too_large: 'An error has occurred. The total file size is too large',
			upload_file_size_limit: 'The file size upload is limited to %{size}MB',
			unspecified_server_error: 'Operation cannot be executed. Please try again later, and contact our system administrators in case the problem persist.',
			no_authorities_error: 'You don\'t have access to this page!',
			no_modify_privilege_wrn_msg: 'You don\'t have access to modify this field',
		},
		validation: {
			required_field: 'The field is required',
			max_length: 'The field must contain maximum %{size} characters and symbols',
			min_length: 'The field must contain at least %{size} characters and symbols',
			required_field_with_name: 'The field (%{fieldName}) is required',
			max_length_with_name: 'The field (%{fieldName}) must contain maximum %{size} characters and symbols',
			min_length_with_name: 'The field (%{fieldName}) must contain at least %{size} characters and symbols',
			phone_number: 'The field must contain a valid phone number',
			email: 'The field must contain a valid email',
			email_already_exists: 'Email already exists',
			url: 'The field must contain a valid URL address',
			number: 'The field must contain a valid number',
			invalid_birthdate: 'The employee should not be under 16 years',
			end_smaller_start: 'The final date cannot be lower than the start year',
			positive_number: 'The field must contain a positive number',
			connected_required_field: 'The field \'%{fieldName}\' should also be filled out.',
			same_colors: 'The colors shouldn\'t match.',
			same_leave_types: 'The leave types shouldn\'t match',
			fill_in_all_required_field: 'Please fill in all mandatory fields',
			passwords_do_not_match: 'Passwords does not match',
			user_exists: 'Duplicated usename or password'
		},
		access_error: 'You do not have the needed credentials.',
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
		register_success: 'Registered successfully!',
		login_success: 'Logged in successfully!',
		login_failed: 'Wrong username or password',
		logout_success: 'Logged out successfully!'
	},
	wysiwyg_editor_labels: {
		add_image: 'Add image',
		add_video: 'Add video',
		add_link: 'Add link',
		add_link_placeholder: 'Paste a link to embed content from another site (e.g. Twitter) and press Enter',
		add_video_placeholder: 'Paste a YouTube, Vine, Vimeo, or other video link, and press Enter',
		add_video_caption: 'Type caption for embed (optional)',
		body_placeholder: 'Write your content here',
		regulation_body_placeholder: 'Write the regulation here',
		body_title: 'Title',
		button_to_metadata: 'Next step',
		button_save_content: 'Save content',
		title: 'Insert title',
		subtitle: 'Insert subtitle (optional)',
		title_required: 'Title is required',
		content_required: 'Contents is required',
		video_embedding_error: 'The video can not be found or the provider does not supports embedded videos.',
		embedding_error: 'The embedded link can not be found or the provider does not supports it.'
	},
	news_creation_wizard_component: {
		element_content: {
			data: 'Content',
			sub: 'Creating content'
		},
		element_metadata: {
			data: 'Metadata',
			sub: 'Input of metadata',
			review: 'Review the metadata'
		},
		element_publish: {
			data: 'Publish',
			sub: 'Publish the article',
			sub_regulation: 'Publish the regulation',
			sub_poll: 'Publish the poll',
			sub_event: 'Publish the event'			
		}
	}
};

export default gb;