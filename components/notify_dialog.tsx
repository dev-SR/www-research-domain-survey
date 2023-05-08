'use client';
import React from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from './ui/dialog';

const NotifyDialog = () => {
	const [open, setOpen] = React.useState(true);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger></DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Attention please 💡</DialogTitle>
					<DialogDescription>
						<ul className='list-disc ml-4'>
							<li>
								👉 <span className='font-bold'>All keyphrases are stemmed</span>, meaning they are
								transformed to their base form.
								<ul className='list-disc ml-6'>
									<li>
										For instance, the word <span className='font-bold'>recognition</span> is stemmed
										as <span className='font-bold'>recognit</span>.
									</li>
								</ul>
							</li>
						</ul>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default NotifyDialog;
