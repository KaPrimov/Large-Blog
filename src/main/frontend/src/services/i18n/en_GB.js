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
		manage_news: 'News'
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
	},
	article_management: {
		articles: 'Articles',
		draft: 'Draft',
		published: 'Published',
		filter: 'Filter',
		open: 'Open',
		stats: 'Stats',
		edit: 'Edit',
		delete: 'Delete',
		publish: 'Publish',
		details: 'Details',
		saving: 'Publishing the article...',
		to_all_articles: 'Article management',
		article_details: 'Open created article',
		article_is_active_until: 'The article is active for reading from the users until %{endDate}',
		article_is_active_since: 'The article is active for reading from the users since %{startDate} and has no end data',
		article_is_inactive_until: 'The article will be active for reading from the users on %{startDate}',
		article_is_inactive_since: 'The article was active for reading from the users on %{endDate}',
		active_label: 'Active',
		inactive_label: 'Inactive',
		future_active_label: 'Will be published',
		not_found_title: 'There are no articles in this category',
		not_items_found_title: 'There are no items in this category',
		to_news: 'All news'
	},
	meta_data_section: {
		start_date: 'Start date',
		end_date: 'End date',
		validation: {
			start_date_is_after: 'The start date should be before the end date',
			start_date_in_past: 'Start date can not be set in past',
			end_date_in_past: 'End date can not be set in past'
		},
		date_creation_title: 'Set period of the article',
		date_creation_subtitle: 'Set start and end date of the publication. The publication will be seen only between these two dates.',
		image_upload_title: 'Upload picture',
		image_upload_subtitle: 'Set header image for the current news.',
		tags_title: 'Tags',
		tags_subtitle: 'Choose tags, which describe your article',
		show_groups_title: 'Target groups',
		show_groups_subtitle: 'Target groups, which will receive the news',
		choose_file_tooltip: 'Choose image from the files system',
		show_article_image_title: 'Article image',
		show_article_image_subtitle: 'The image is visualised at the top of the article',
		show_news_description_title: 'Article description',
		show_news_description_subtitle: 'The description summarize the article\'s content',
		show_tags_title: 'Tags',
		show_tags_subtitle: 'The article can be found under these tags',
		show_article_dates_title: 'Active period',
		show_article_dates_subtitle: 'The article will be active between these two dates',
		crop_image_tooltip: 'Crop the image',
		cancel_image_tooltip: 'Delete the image',
		crop_profile_picture_tooltip: 'Crop the image',
		cancel_profile_picture_tooltip: 'Cancel picture upload',
		choose_profile_picture_tooltip: 'Choose image from the files system',
		display_stats_title: 'Privacy',
		display_stats_subtitle: 'Choose privacy of the poll',
		display_stats_subtitle_explanation: 'The statistics of the poll will be visible according to the privacy level',
		delete_profile_picture_tooltip: 'Delete the image',
		save_button: 'Save metadata',
		cancel_publish: 'Cancel publishing',
		to_publish_button: 'Publish',
		short_description_title: 'Short description',
		short_description_subtitle: 'The description will be seen in the news list. Write something brief, accentuating and decribing, which will make the user reed the full article. ',
		short_description_placeholder: 'Short description...',
		errors: {
			invalid_data: 'You have invalid data'
		},
	},
	article_management_container: {
		main_title: 'News',
		sub_title: 'Article management',
		show_editor_label: 'Create article',
		meta_data_label: 'Metadata input',
		publish_label: 'Publish article',
		back_to_management_button: 'Article management',
		back_to_news_button: 'All articles',
		article: 'Article',
		user_not_eligible: 'You are not eligible to view that article',
		show_view_label: 'View article',
		date_of_publish: 'Date of publication: '
	},
};

export default gb;