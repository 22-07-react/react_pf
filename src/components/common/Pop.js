import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Pop = forwardRef(({ children }, ref) => {
	const [Open, setOpen] = useState(false);

	useImperativeHandle(ref, () => {
		return {
			open: () => setOpen(true),
		};
	});

	useEffect(() => {
		Open ? (document.body.style.overflowY = 'hidden') : (document.body.style.overflowY = 'auto');
	}, [Open]);

	return (
		<>
			<AnimatePresence>
				{Open && (
					<motion.aside
						className='pop'
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0 } }}
						exit={{ opacity: 0, scale: 0, transition: { duration: 0.5, delay: 0.5 } }}>
						<motion.div
							className='con'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.5 } }}
							exit={{ opacity: 0, transition: { duration: 0.5, delay: 0 } }}>
							{children}
						</motion.div>
						<motion.span
							className='close'
							onClick={() => setOpen(false)}
							initial={{ opacity: 0, x: 100 }}
							animate={{ opacity: 1, x: 0, transition: { duration: 0.5, delay: 1 } }}
							exit={{ opacity: 0, x: 100, transition: { duration: 0.5, delay: 0 } }}>
							close
						</motion.span>
					</motion.aside>
				)}
			</AnimatePresence>
		</>
	);
});

export default Pop;
