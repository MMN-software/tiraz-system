type Props = {
  className?: string;
  title?: string;
};

/** ستاره‌ی هشت‌پر؛ تزئینی (aria-hidden) مگر اینکه title داده شود. */
export default function EightPointStar({ className = "size-4", title }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path
        fill="currentColor"
        d="M12 0l2.4 6.2L20.5 3.5 17.8 9.6 24 12l-6.2 2.4 2.7 6.1-6.1-2.7L12 24l-2.4-6.2-6.1 2.7 2.7-6.1L0 12l6.2-2.4L3.5 3.5l6.1 2.7z"
      />
    </svg>
  );
}

export { EightPointStar };