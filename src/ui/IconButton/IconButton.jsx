import styles from './iconButton.module.css';

export const IconButton = ({
  type = 'button',
  disabled = false,
  variant = 'toolbar',
  size = 'sm',
  icon,
  onClick,
  ...props
}) => {
  const Icon = icon;

  // size: sm || md
  // variant: toolbar || ghost

  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      type={type}
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      {...props}
    >
      <span>
        <Icon />
      </span>
    </button>
  );
};
