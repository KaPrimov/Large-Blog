import React from 'react';
import ScrollArea from 'react-scrollbar';
import ShowEmployeeTag from './show-employee-tag.component.jsx';

const ShowTargetEmployees = ({employees}) => {
	return (
		<div className='manage_article_target_group text-xs-center'>
			<article classID="target-group col-xs-12">
				<header className="clearfix">
					<ScrollArea
						speed={0.8}
						horizontal={false}
						className="target-group-list"
					>
						<div>
							{employees && employees.map((employee) =>
								<ShowEmployeeTag employee={employee} key={employee.id}/>
							)}
						</div>
					</ScrollArea>
				</header>
			</article>
		</div>
	);
};

export default ShowTargetEmployees;
