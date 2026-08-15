"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Reveal — Framer Motion scroll-in wrapper.
 * Slides + fades content up (or from a chosen direction) the first time
 * it enters the viewport. Respects prefers-reduced-motion.
 *
 * Usage:
 *   <Reveal><Card /></Reveal>
 *   <Reveal direction="left" delay={0.1}>...</Reveal>
 */
const OFFSETS = {
	up: { y: 40, x: 0 },
	down: { y: -40, x: 0 },
	left: { x: 40, y: 0 },
	right: { x: -40, y: 0 },
	none: { x: 0, y: 0 },
};

export default function Reveal({
	children,
	direction = "up",
	delay = 0,
	duration = 0.7,
	amount = 0.2,
	once = true,
	className,
	style,
	as = "div",
}) {
	const prefersReduced = useReducedMotion();
	const offset = OFFSETS[direction] || OFFSETS.up;
	const MotionTag = motion[as] || motion.div;

	if (prefersReduced) {
		const Tag = as;
		return (
			<Tag className={className} style={style}>
				{children}
			</Tag>
		);
	}

	return (
		<MotionTag
			className={className}
			style={style}
			initial={{ opacity: 0, x: offset.x, y: offset.y }}
			whileInView={{ opacity: 1, x: 0, y: 0 }}
			viewport={{ once, amount }}
			transition={{
				duration,
				delay,
				ease: [0.16, 1, 0.3, 1],
			}}
		>
			{children}
		</MotionTag>
	);
}

/**
 * StaggerGroup + StaggerItem — coordinate a staggered entrance for a list
 * of children (e.g. a grid of cards).
 */
export function StaggerGroup({
	children,
	className,
	style,
	stagger = 0.1,
	amount = 0.2,
	once = true,
}) {
	const prefersReduced = useReducedMotion();
	if (prefersReduced) {
		return (
			<div className={className} style={style}>
				{children}
			</div>
		);
	}
	return (
		<motion.div
			className={className}
			style={style}
			initial="hidden"
			whileInView="show"
			viewport={{ once, amount }}
			variants={{
				hidden: {},
				show: { transition: { staggerChildren: stagger } },
			}}
		>
			{children}
		</motion.div>
	);
}

export function StaggerItem({ children, className, style, direction = "up" }) {
	const offset = OFFSETS[direction] || OFFSETS.up;
	return (
		<motion.div
			className={className}
			style={style}
			variants={{
				hidden: { opacity: 0, x: offset.x, y: offset.y },
				show: {
					opacity: 1,
					x: 0,
					y: 0,
					transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
				},
			}}
		>
			{children}
		</motion.div>
	);
}
