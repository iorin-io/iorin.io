import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface BottomAppearanceProps {
	children: ReactNode;
	order: number;
}

export const BottomAppearance: React.FC<BottomAppearanceProps> = ({
	children,
	order,
}) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.5,
				delay: 0.2 * order,
				ease: "easeOut",
			}}
		>
			{children}
		</motion.div>
	);
};
