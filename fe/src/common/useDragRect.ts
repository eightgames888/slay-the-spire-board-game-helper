import { useState, useRef, type PointerEvent, type RefObject, useEffect } from 'react';

export const useDragRect = ({
	initPositoin = { left: 0, top: 0 },
	containerRef,
	width,
	onDrop,
}: {
	initPositoin?: { left: number, top: number }
	containerRef: RefObject<HTMLDivElement | null>, width: number, onDrop?: (position: { left: number, top: number }) => void
}) => {
	const [position, setPosition] = useState(initPositoin);
	useEffect(() => {
		setPosition(initPositoin)
	}, [initPositoin.left, initPositoin.top])
	const isDragging = useRef(false);

	const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
		isDragging.current = true;
		e.currentTarget.setPointerCapture(e.pointerId);
	};

	const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
		if (!isDragging.current || !containerRef.current) return;

		const rect = containerRef.current.getBoundingClientRect();

		const pointerX = ((e.clientX - rect.left) / rect.width) * 100;
		const pointerY = ((e.clientY - rect.top) / rect.height) * 100;

		let x = pointerX - width / 2;
		let y = pointerY - width / 2;

		const limit = 100 - width;
		x = Math.max(0, Math.min(x, limit));
		y = Math.max(0, Math.min(y, limit));

		setPosition({ left: x, top: y });
	};

	const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
		if (!isDragging.current) return;
		isDragging.current = false;
		e.currentTarget.releasePointerCapture(e.pointerId);

		if (onDrop) {
			onDrop(position);
		}
	};

	return {
		dragItemProps: {
			onPointerDown,
			onPointerMove,
			onPointerUp,
			style: {
				position: 'absolute' as const,
				width: `${width}%`,
				aspectRatio: '1 / 1',
				left: `${position.left}%`,
				top: `${position.top}%`,
				touchAction: 'none',
				cursor: 'move',
				userSelect: 'none' as const,
			}
		},
		position
	};
};