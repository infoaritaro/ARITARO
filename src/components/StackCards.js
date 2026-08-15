"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
	{
		phase: "01",
		title: "Scope & Reconnaissance",
		desc: "We map your attack surface the way a real adversary would — enumerating assets, endpoints, and trust boundaries before a single payload is fired.",
		points: ["Asset discovery", "Threat modelling", "Rules of engagement"],
		accent: "#2563EB",
	},
	{
		phase: "02",
		title: "Deep Manual Testing",
		desc: "Beyond automated scanners: senior engineers hunt business-logic flaws, chained exploits, and auth bypasses that tools structurally cannot find.",
		points: ["OWASP Top 10", "Business logic", "Privilege escalation"],
		accent: "#4F46E5",
	},
	{
		phase: "03",
		title: "Exploitation & Impact",
		desc: "Every finding is safely proven with a working proof-of-concept, so you see real business impact instead of a theoretical severity rating.",
		points: ["Validated PoCs", "Impact scoring", "Zero false positives"],
		accent: "#0EA5E9",
	},
	{
		phase: "04",
		title: "Report & Remediation",
		desc: "A clear, code-level report your developers can act on immediately — plus a free retest to confirm every issue is actually closed.",
		points: ["Developer-ready fixes", "Executive summary", "Free retest"],
		accent: "#0891B2",
	},
];

export default function StackCards() {
	const sectionRef = useRef(null);
	const headingRef = useRef(null);
	const cardsWrapRef = useRef(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const mm = gsap.matchMedia();

			gsap.from(headingRef.current, {
				scrollTrigger: {
					trigger: headingRef.current,
					start: "top 82%",
					toggleActions: "play none none reverse",
				},
				y: 50,
				opacity: 0,
				duration: 0.9,
				ease: "power3.out",
			});

			// Desktop: true pinned stacking effect.
			mm.add("(min-width: 768px)", () => {
				const cards = gsap.utils.toArray(".stack-card");

				cards.forEach((card, i) => {
					// Pin every card except the last while the next scrolls over it.
					ScrollTrigger.create({
						trigger: card,
						start: "top 96px",
						endTrigger: cardsWrapRef.current,
						end: "bottom 96px",
						pin: true,
						pinSpacing: false,
						id: `stack-${i}`,
					});

					// As later cards cover it, scale + fade the pinned card slightly.
					if (i < cards.length - 1) {
						gsap.to(card, {
							scale: 0.94 - (cards.length - 1 - i) * 0.008,
							opacity: 0.55,
							filter: "brightness(0.94)",
							ease: "none",
							scrollTrigger: {
								trigger: cards[i + 1],
								start: "top 80%",
								end: "top 96px",
								scrub: true,
							},
						});
					}
				});
			});

			// Mobile: simple fade-up, no pinning.
			mm.add("(max-width: 767px)", () => {
				gsap.utils.toArray(".stack-card").forEach((card) => {
					gsap.from(card, {
						scrollTrigger: {
							trigger: card,
							start: "top 88%",
							toggleActions: "play none none reverse",
						},
						y: 48,
						opacity: 0,
						duration: 0.7,
						ease: "power3.out",
					});
				});
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={sectionRef}
			id="methodology"
			style={{
				position: "relative",
				padding: "96px 0 120px",
				background: "var(--bg-base)",
				overflow: "clip",
			}}
		>
			<div
				style={{
					maxWidth: 1080,
					margin: "0 auto",
					padding: "0 24px",
				}}
			>
				{/* Heading */}
				<div
					ref={headingRef}
					style={{ textAlign: "center", marginBottom: 56 }}
				>
					<div
						style={{
							display: "inline-flex",
							alignItems: "center",
							gap: 8,
							background: "var(--glass-bg)",
							border: "1px solid var(--glass-border)",
							borderRadius: 100,
							padding: "6px 18px",
							marginBottom: 20,
							backdropFilter: "blur(12px)",
						}}
					>
						<span
							style={{
								width: 6,
								height: 6,
								borderRadius: "50%",
								background: "var(--cta)",
							}}
						/>
						<span
							style={{
								fontFamily: "var(--font-mono)",
								fontSize: 10,
								letterSpacing: "2.5px",
								color: "var(--hero-badge-text)",
								fontWeight: 600,
							}}
						>
							HOW WE WORK
						</span>
					</div>
					<h2
						style={{
							fontSize: "clamp(28px, 5vw, 52px)",
							fontWeight: 900,
							lineHeight: 1.1,
							letterSpacing: "-0.5px",
							color: "var(--text-primary)",
							marginBottom: 16,
						}}
						className="text-balance"
					>
						A methodology that{" "}
						<span
							style={{
								backgroundImage:
									"linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)",
								WebkitBackgroundClip: "text",
								backgroundClip: "text",
								WebkitTextFillColor: "transparent",
							}}
						>
							finds what others miss
						</span>
					</h2>
					<p
						style={{
							maxWidth: 560,
							margin: "0 auto",
							color: "var(--text-muted)",
							fontSize: 16,
							lineHeight: 1.7,
						}}
						className="text-pretty"
					>
						Four disciplined phases, engineered for depth. Scroll to see how
						an engagement unfolds.
					</p>
				</div>

				{/* Stacking cards */}
				<div
					ref={cardsWrapRef}
					style={{ display: "flex", flexDirection: "column", gap: 24 }}
				>
					{STEPS.map((step) => (
						<article
							key={step.phase}
							className="stack-card"
							style={{
								position: "relative",
								borderRadius: 24,
								padding: 6,
								background: "var(--glass-bg)",
								border: "1px solid var(--card-border)",
								boxShadow: "0 24px 60px rgba(11, 30, 59, 0.10)",
								backdropFilter: "blur(10px)",
								WebkitBackdropFilter: "blur(10px)",
								willChange: "transform",
							}}
						>
							<div
								style={{
									position: "relative",
									borderRadius: 18,
									padding: "clamp(28px, 4vw, 44px)",
									background: "var(--card-bg)",
									boxShadow:
										"inset 0 1px 1px rgba(255,255,255,0.5)",
									overflow: "hidden",
									display: "flex",
									flexDirection: "column",
									gap: 20,
								}}
							>
								{/* accent glow */}
								<div
									style={{
										position: "absolute",
										top: -80,
										right: -60,
										width: 240,
										height: 240,
										borderRadius: "50%",
										background: `radial-gradient(circle, ${step.accent}22 0%, transparent 70%)`,
										pointerEvents: "none",
									}}
								/>
								<div
									style={{
										display: "flex",
										alignItems: "center",
										gap: 16,
										position: "relative",
									}}
								>
									<span
										style={{
											fontFamily: "var(--font-mono)",
											fontSize: 14,
											fontWeight: 700,
											color: "#fff",
											background: `linear-gradient(135deg, ${step.accent}, ${step.accent}cc)`,
											width: 48,
											height: 48,
											borderRadius: 12,
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											flexShrink: 0,
											boxShadow: `0 8px 20px ${step.accent}40`,
										}}
									>
										{step.phase}
									</span>
									<h3
										style={{
											fontSize: "clamp(20px, 3vw, 30px)",
											fontWeight: 800,
											color: "var(--text-primary)",
											lineHeight: 1.2,
										}}
									>
										{step.title}
									</h3>
								</div>

								<p
									style={{
										fontSize: 16,
										lineHeight: 1.75,
										color: "var(--text-muted)",
										maxWidth: 640,
										position: "relative",
									}}
								>
									{step.desc}
								</p>

								<div
									style={{
										display: "flex",
										flexWrap: "wrap",
										gap: 10,
										position: "relative",
									}}
								>
									{step.points.map((p) => (
										<span
											key={p}
											style={{
												display: "inline-flex",
												alignItems: "center",
												gap: 8,
												fontSize: 13,
												fontWeight: 500,
												color: "var(--text-primary)",
												background: "var(--secondary)",
												border: "1px solid var(--border-subtle)",
												borderRadius: 9999,
												padding: "7px 14px",
											}}
										>
											<svg
												width="14"
												height="14"
												viewBox="0 0 24 24"
												fill="none"
												stroke={step.accent}
												strokeWidth="3"
												strokeLinecap="round"
												strokeLinejoin="round"
												aria-hidden="true"
											>
												<polyline points="20 6 9 17 4 12" />
											</svg>
											{p}
										</span>
									))}
								</div>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
