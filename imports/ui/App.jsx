import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "/imports/api/TasksCollection";
import { Task } from "./components/Task";
import { TaskForm } from "./components/TaskForm";

export const App = () => {
	const tasks = useTracker(() => TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch());

	const toggleChecked = ({ _id, isChecked }) => {
		TasksCollection.update(_id, {
			$set: {
				isChecked: !isChecked,
			},
		});
	};

  const deleteTask = ({ _id }) => TasksCollection.remove(_id);

	return (
		<div>
			<h1>Welcome to Meteor!</h1>
			<TaskForm />
			<ul>
				{tasks.map((task) => (
					<Task
						key={task._id}
						task={task}
						onCheckboxClick={toggleChecked}
						onDeleteClick={deleteTask}
					/>
				))}
			</ul>
		</div>
	);
};
