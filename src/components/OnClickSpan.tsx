import * as motion from "framer-motion/client";
import { css } from "../../styled-system/css";

export const OnClickSpan: React.FC<{
	children: React.ReactNode;
	className?: string;
	onClick: () => void;
	whileHover?: { scale: number };
}> = ({ children, onClick, className, whileHover }) => {
	return (
		<motion.div whileHover={whileHover}>
			<span
				onClick={onClick}
				className={`${className} ${css({ cursor: "pointer" })}`}
			>
				{children}
			</span>
		</motion.div>
	);
};
